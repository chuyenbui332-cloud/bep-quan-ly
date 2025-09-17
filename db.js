// db.js
require("dotenv").config(); // để đọc file .env
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false // 👈 thêm SSL để Railway cho phép
  }
});

// Kiểm tra DB khi server start
(async () => {
  try {
    const [rows] = await pool.query("SELECT DATABASE() AS db");
    console.log("👉 Kết nối thành công DB:", rows[0].db);
  } catch (err) {
    console.error("❌ Lỗi kết nối DB:", err.message);
  }
})();

module.exports = pool;
