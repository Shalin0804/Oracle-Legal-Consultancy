import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import crypto from 'node:crypto';

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT || 5000);
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const DB_NAME = process.env.DB_NAME || 'oracle_legal';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '1234';
const PASSWORD_KEYLEN = 64;
const PASSWORD_SALT_BYTES = 16;

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json({ limit: '100kb' }));

let pool;
const sessions = new Map();

async function initDatabase() {
  const adminConnection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  });
  await adminConnection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME.replaceAll('`', '')}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await adminConnection.end();

  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    charset: 'utf8mb4',
  });

  await pool.query(`CREATE TABLE IF NOT EXISTS vision_messages (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    heading VARCHAR(120) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_vision_created_at (created_at)
  )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS admin_users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(80) NOT NULL DEFAULT 'admin',
    password_hash CHAR(128) NOT NULL,
    password_salt CHAR(32) NOT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_admin_username (username)
  )`);

  const [admins] = await pool.query('SELECT id FROM admin_users WHERE username = ? LIMIT 1', ['admin']);
  if (admins.length === 0) {
    const { hash, salt } = hashPassword(ADMIN_PASSWORD);
    await pool.execute(
      'INSERT INTO admin_users (username, password_hash, password_salt) VALUES (?, ?, ?)',
      ['admin', hash, salt]
    );
    console.log('Admin account initialized from ADMIN_PASSWORD.');
  }
}

function hashPassword(password, saltHex = crypto.randomBytes(PASSWORD_SALT_BYTES).toString('hex')) {
  const hash = crypto.scryptSync(password, Buffer.from(saltHex, 'hex'), PASSWORD_KEYLEN);
  return { hash: hash.toString('hex'), salt: saltHex };
}

function verifyPassword(password, storedHash, saltHex) {
  const derived = crypto.scryptSync(password, Buffer.from(saltHex, 'hex'), PASSWORD_KEYLEN);
  const stored = Buffer.from(storedHash, 'hex');
  return stored.length === derived.length && crypto.timingSafeEqual(stored, derived);
}

function requireAuth(req, res, next) {
  const token = req.get('Authorization')?.replace(/^Bearer\s+/i, '');
  if (!token || !sessions.has(token)) return res.status(401).json({ message: 'Unauthorized' });
  next();
}

app.get('/api/health', async (_req, res) => {
  try { await pool.query('SELECT 1'); res.json({ ok: true, database: true }); }
  catch (error) { res.status(503).json({ ok: false, database: false, message: error.message }); }
});

app.post('/api/admin/login', async (req, res) => {
  const password = String(req.body?.password || '');
  if (!password) return res.status(401).json({ message: 'Incorrect password.' });

  try {
    const [rows] = await pool.execute(
      'SELECT password_hash AS passwordHash, password_salt AS passwordSalt FROM admin_users WHERE username = ? LIMIT 1',
      ['admin']
    );

    if (!rows.length || !verifyPassword(password, rows[0].passwordHash, rows[0].passwordSalt)) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    sessions.set(token, Date.now());
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not sign in.' });
  }
});

app.post('/api/admin/change-password', requireAuth, async (req, res) => {
  const currentPassword = String(req.body?.currentPassword || '');
  const newPassword = String(req.body?.newPassword || '');

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Current password and new password are required.' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ message: 'New password must be at least 8 characters long.' });
  }

  if (newPassword.length > 200) {
    return res.status(400).json({ message: 'New password is too long.' });
  }

  try {
    const [rows] = await pool.execute(
      'SELECT password_hash AS passwordHash, password_salt AS passwordSalt FROM admin_users WHERE username = ? LIMIT 1',
      ['admin']
    );

    if (!rows.length || !verifyPassword(currentPassword, rows[0].passwordHash, rows[0].passwordSalt)) {
      return res.status(401).json({ message: 'Current password is incorrect.' });
    }

    const { hash, salt } = hashPassword(newPassword);

    await pool.execute(
      'UPDATE admin_users SET password_hash = ?, password_salt = ? WHERE username = ?',
      [hash, salt, 'admin']
    );

    // Invalidate every existing session after a password change.
    sessions.clear();

    res.json({ ok: true, message: 'Password changed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not change the password.' });
  }
});

app.post('/api/admin/logout', requireAuth, (req, res) => {
  const token = req.get('Authorization')?.replace(/^Bearer\s+/i, '');
  sessions.delete(token);
  res.json({ ok: true });
});

app.get('/api/vision/messages', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, heading, body, created_at AS createdAt FROM vision_messages ORDER BY created_at DESC, id DESC');
    res.json(rows);
  } catch (error) { console.error(error); res.status(500).json({ message: 'Could not load Vision messages.' }); }
});

app.post('/api/vision/messages', requireAuth, async (req, res) => {
  const heading = String(req.body?.heading || '').trim();
  const body = String(req.body?.body || '').trim();
  if (!heading || !body) return res.status(400).json({ message: 'Heading and message are required.' });
  if (heading.length > 120) return res.status(400).json({ message: 'Heading is too long.' });
  if (body.length > 5000) return res.status(400).json({ message: 'Message is too long.' });
  try {
    const [result] = await pool.execute('INSERT INTO vision_messages (heading, body) VALUES (?, ?)', [heading, body]);
    const [rows] = await pool.execute('SELECT id, heading, body, created_at AS createdAt FROM vision_messages WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) { console.error(error); res.status(500).json({ message: 'Could not publish the Vision message.' }); }
});

app.delete('/api/vision/messages/:id', requireAuth, async (req, res) => {
  try { await pool.execute('DELETE FROM vision_messages WHERE id = ?', [req.params.id]); res.json({ ok: true }); }
  catch (error) { console.error(error); res.status(500).json({ message: 'Could not delete the message.' }); }
});

app.delete('/api/vision/messages', requireAuth, async (_req, res) => {
  try { await pool.query('DELETE FROM vision_messages'); res.json({ ok: true }); }
  catch (error) { console.error(error); res.status(500).json({ message: 'Could not clear messages.' }); }
});

initDatabase().then(() => app.listen(PORT, () => console.log(`Oracle Legal API running at http://localhost:${PORT}`))).catch((error) => { console.error('Database startup failed:', error.message); process.exit(1); });
