require("dotenv").config();
const mysql = require("mysql2/promise");

let pool;

if (process.env.MYSQL_URL) {
  // Parse từ MYSQL_URL
  const url = new URL(process.env.MYSQL_URL);
  pool = mysql.createPool({
    host: url.hostname,
    user: url.username,
    password: url.password,
    database: url.pathname.substring(1),
    port: Number(url.port),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: { rejectUnauthorized: false }
  });
} else {
  // fallback nếu không có MYSQL_URL
  pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: Number(process.env.MYSQLPORT),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: { rejectUnauthorized: false }
  });
}

// test
(async () => {
  try {
    const [rows] = await pool.query("SELECT DATABASE() AS db");
    console.log("👉 Connected to DB:", rows[0].db);
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
  }
})();

module.exports = pool;
