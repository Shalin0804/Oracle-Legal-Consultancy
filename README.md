# Oracle Legal Consultancy — Vision CMS + Anime.js

This version adds a real owner-managed Vision message system:

**Admin → Node/Express API → MySQL → Vision Page**

It also adds Anime.js v4 animations to the Vision page. Anime.js supports React through `useEffect`/`createScope`, and its timeline API is used for the hero sequence. citeturn0search2turn0search0

## 1. Frontend setup

```bash
npm install
npm run dev
```

The Vite app runs on `http://localhost:5173`.

## 2. Backend setup

From the project root:

```bash
cd server
copy .env.example .env
npm install express cors dotenv mysql2
node src/server.js
```

On macOS/Linux use `cp .env.example .env` instead of `copy`.

The API runs on `http://localhost:5000`.

The backend automatically creates the `oracle_legal` database and the `vision_messages` table if the MySQL user has permission to create databases/tables. The included SQL is also available at `server/sql/schema.sql`.

Express supports database integrations through Node database drivers; this project uses `mysql2` for MySQL. citeturn0search12

## 3. Configure `.env`

Example:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=oracle_legal
ADMIN_PASSWORD=use-a-strong-password
```

Never commit the real `.env` file.

## 4. How the Vision CMS works

1. Open `/admin`.
2. Sign in using the `ADMIN_PASSWORD` from the backend `.env`.
3. Write a heading and message.
4. Click **Publish Message**.
5. The API inserts a new MySQL row.
6. Existing messages remain untouched.
7. `/vision` loads all messages from MySQL.
8. Every visitor sees the same published history.

The navbar does **not** display Vision messages. It only contains the `/vision` navigation link.

## 5. Anime.js features

The Vision page includes:

- Staged hero entrance timeline
- Rotating orbital ring
- Pulsing gold visual accent
- Animated hero CTA
- Scroll-triggered principle cards
- Interactive 3D-ish hover motion on owner messages
- Responsive reduced-motion handling

Anime.js's current React guidance uses `createScope()` to scope animations and clean them up when a component unmounts. citeturn0search2

## Production notes

The example API uses an in-memory session token for the owner login. For production, replace it with a persistent authentication system, hashed passwords, HTTPS, rate limiting, secure cookies/JWT strategy, and proper authorization.


## Admin password management

The admin password is stored in MySQL as a salted `scrypt` hash.

On the first backend startup, if the `admin_users` table has no `admin` account, the server creates one using `ADMIN_PASSWORD` from `server/.env`:

```env
ADMIN_PASSWORD=1234
```

After signing in, use **Security → Change Admin Password** in `/admin`. The new password is written to MySQL and the existing login sessions are invalidated.

Important: `ADMIN_PASSWORD` is only the bootstrap password when the `admin` row does not exist. After the password is changed through the Admin panel, the database password is used for future logins.

The database table is:

```sql
admin_users
```

Passwords are never stored as plain text.
