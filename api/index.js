import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import crypto from "node:crypto";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "100kb" }));

let pool;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 4000),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || "oracle_legal",

      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,

      charset: "utf8mb4",

      ssl: {
        rejectUnauthorized: true,
      },
    });
  }

  return pool;
}

function hashPassword(
  password,
  saltHex = crypto.randomBytes(16).toString("hex")
) {
  const hash = crypto.scryptSync(
    password,
    Buffer.from(saltHex, "hex"),
    64
  );

  return {
    hash: hash.toString("hex"),
    salt: saltHex,
  };
}

function verifyPassword(password, storedHash, saltHex) {
  const derived = crypto.scryptSync(
    password,
    Buffer.from(saltHex, "hex"),
    64
  );

  const stored = Buffer.from(storedHash, "hex");

  return (
    stored.length === derived.length &&
    crypto.timingSafeEqual(stored, derived)
  );
}

function getToken(req) {
  const header = req.get("Authorization") || "";

  return header.replace(/^Bearer\s+/i, "").trim();
}

function hashToken(token) {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

async function requireAuth(req, res, next) {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const tokenHash = hashToken(token);

    const [rows] = await getPool().execute(
      `
      SELECT id, username
      FROM admin_sessions
      WHERE token_hash = ?
        AND expires_at > NOW()
      LIMIT 1
      `,
      [tokenHash]
    );

    if (!rows.length) {
      return res.status(401).json({
        message: "Session expired. Please sign in again.",
      });
    }

    req.admin = rows[0];

    next();
  } catch (error) {
    console.error("Auth error:", error);

    return res.status(500).json({
      message: "Authentication error.",
    });
  }
}

/*
|--------------------------------------------------------------------------
| Health
|--------------------------------------------------------------------------
*/

app.get("/api/health", async (_req, res) => {
  try {
    await getPool().query("SELECT 1");

    res.json({
      ok: true,
      database: true,
    });
  } catch (error) {
    console.error(error);

    res.status(503).json({
      ok: false,
      database: false,
      message: error.message,
    });
  }
});

/*
|--------------------------------------------------------------------------
| Admin Login
|--------------------------------------------------------------------------
*/

app.post("/api/admin/login", async (req, res) => {
  const password = String(req.body?.password || "");

  if (!password) {
    return res.status(401).json({
      message: "Incorrect password.",
    });
  }

  try {
    const [rows] = await getPool().execute(
      `
      SELECT password_hash AS passwordHash,
             password_salt AS passwordSalt
      FROM admin_users
      WHERE username = ?
      LIMIT 1
      `,
      ["admin"]
    );

    if (
      !rows.length ||
      !verifyPassword(
        password,
        rows[0].passwordHash,
        rows[0].passwordSalt
      )
    ) {
      return res.status(401).json({
        message: "Incorrect password.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    const tokenHash = hashToken(token);

    /*
     * Session expires after 24 hours.
     */
    await getPool().execute(
      `
      INSERT INTO admin_sessions
        (token_hash, username, expires_at)
      VALUES
        (?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))
      `,
      [tokenHash, "admin"]
    );

    res.json({
      token,
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Could not sign in.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| Change Password
|--------------------------------------------------------------------------
*/

app.post(
  "/api/admin/change-password",
  requireAuth,
  async (req, res) => {
    const currentPassword = String(
      req.body?.currentPassword || ""
    );

    const newPassword = String(
      req.body?.newPassword || ""
    );

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message:
          "Current password and new password are required.",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        message:
          "New password must be at least 8 characters long.",
      });
    }

    if (newPassword.length > 200) {
      return res.status(400).json({
        message: "New password is too long.",
      });
    }

    try {
      const [rows] = await getPool().execute(
        `
        SELECT password_hash AS passwordHash,
               password_salt AS passwordSalt
        FROM admin_users
        WHERE username = ?
        LIMIT 1
        `,
        ["admin"]
      );

      if (
        !rows.length ||
        !verifyPassword(
          currentPassword,
          rows[0].passwordHash,
          rows[0].passwordSalt
        )
      ) {
        return res.status(401).json({
          message: "Current password is incorrect.",
        });
      }

      const { hash, salt } = hashPassword(newPassword);

      await getPool().execute(
        `
        UPDATE admin_users
        SET password_hash = ?,
            password_salt = ?
        WHERE username = ?
        `,
        [hash, salt, "admin"]
      );

      /*
       * Log out all sessions after password change.
       */
      await getPool().execute(
        "DELETE FROM admin_sessions WHERE username = ?",
        ["admin"]
      );

      res.json({
        ok: true,
        message: "Password changed successfully.",
      });
    } catch (error) {
      console.error("Password change error:", error);

      res.status(500).json({
        message: "Could not change the password.",
      });
    }
  }
);

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/

app.post(
  "/api/admin/logout",
  requireAuth,
  async (req, res) => {
    try {
      const token = getToken(req);

      await getPool().execute(
        "DELETE FROM admin_sessions WHERE token_hash = ?",
        [hashToken(token)]
      );

      res.json({
        ok: true,
      });
    } catch (error) {
      console.error("Logout error:", error);

      res.status(500).json({
        message: "Could not log out.",
      });
    }
  }
);

/*
|--------------------------------------------------------------------------
| Get Vision Messages
|--------------------------------------------------------------------------
*/

app.get("/api/vision/messages", async (_req, res) => {
  try {
    const [rows] = await getPool().query(
      `
      SELECT
        id,
        heading,
        body,
        created_at AS createdAt
      FROM vision_messages
      ORDER BY created_at DESC, id DESC
      `
    );

    res.json(rows);
  } catch (error) {
    console.error("Vision load error:", error);

    res.status(500).json({
      message: "Could not load Vision messages.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| Publish Vision Message
|--------------------------------------------------------------------------
*/

app.post(
  "/api/vision/messages",
  requireAuth,
  async (req, res) => {
    const heading = String(
      req.body?.heading || ""
    ).trim();

    const body = String(
      req.body?.body || ""
    ).trim();

    if (!heading || !body) {
      return res.status(400).json({
        message: "Heading and message are required.",
      });
    }

    if (heading.length > 120) {
      return res.status(400).json({
        message: "Heading is too long.",
      });
    }

    if (body.length > 5000) {
      return res.status(400).json({
        message: "Message is too long.",
      });
    }

    try {
      const [result] = await getPool().execute(
        `
        INSERT INTO vision_messages
          (heading, body)
        VALUES
          (?, ?)
        `,
        [heading, body]
      );

      const [rows] = await getPool().execute(
        `
        SELECT
          id,
          heading,
          body,
          created_at AS createdAt
        FROM vision_messages
        WHERE id = ?
        `,
        [result.insertId]
      );

      res.status(201).json(rows[0]);
    } catch (error) {
      console.error("Vision publish error:", error);

      res.status(500).json({
        message:
          "Could not publish the Vision message.",
      });
    }
  }
);

/*
|--------------------------------------------------------------------------
| Delete One Vision Message
|--------------------------------------------------------------------------
*/

app.delete(
  "/api/vision/messages/:id",
  requireAuth,
  async (req, res) => {
    try {
      await getPool().execute(
        "DELETE FROM vision_messages WHERE id = ?",
        [req.params.id]
      );

      res.json({
        ok: true,
      });
    } catch (error) {
      console.error("Vision delete error:", error);

      res.status(500).json({
        message:
          "Could not delete the message.",
      });
    }
  }
);

/*
|--------------------------------------------------------------------------
| Delete All Vision Messages
|--------------------------------------------------------------------------
*/

app.delete(
  "/api/vision/messages",
  requireAuth,
  async (_req, res) => {
    try {
      await getPool().query(
        "DELETE FROM vision_messages"
      );

      res.json({
        ok: true,
      });
    } catch (error) {
      console.error("Vision clear error:", error);

      res.status(500).json({
        message:
          "Could not clear messages.",
      });
    }
  }
);

export default app;