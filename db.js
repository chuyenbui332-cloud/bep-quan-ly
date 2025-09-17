// db.js
const mysql = require("mysql2/promise");
require("dotenv").config();

let pool;

if (process.env.MYSQL_URL) {
  // 👉 Nếu có full URL (Railway / Render)
  pool = mysql.createPool(process.env.MYSQL_URL);
  console.log("✅ Đang kết nối DB bằng MYSQL_URL");
} else {
  // 👉 Nếu không có MYSQL_URL thì fallback về biến rời (local)
  pool = mysql.createPool({
    host: process.env.MYSQLHOST || "localhost",
    user: process.env.MYSQLUSER || "root",
    password: process.env.MYSQLPASSWORD || "",
    database: process.env.MYSQLDATABASE || "test",
    port: process.env.MYSQLPORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  console.log("✅ Đang kết nối DB bằng config rời");
}

module.exports = pool;
