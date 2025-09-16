// db.js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",   // đổi theo DB của bạn
  user: "root",
  password: "Hoilamgi2807@",  // nhớ bảo mật sau này
  database: "quanlybep",
  port: 3306,   // ⚡ thêm dòng này
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
// Kiểm tra DB hiện tại ngay khi server start
(async () => {
  try {
    const [rows] = await pool.query("SELECT DATABASE() AS db");
    console.log("👉 Đang kết nối database:", rows[0].db);
  } catch (err) {
    console.error("❌ Lỗi kết nối DB:", err.message);
  }
})();



module.exports = pool;
