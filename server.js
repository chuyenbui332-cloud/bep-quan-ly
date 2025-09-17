// server.js
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file cho frontend
app.use(express.static(path.join(__dirname, "public")));
const pool = require("./db");

(async () => {
  try {
    const [db] = await pool.query("SELECT DATABASE() AS db");
    console.log("👉 App đang kết nối database:", db[0].db);

    const [cols] = await pool.query("SHOW COLUMNS FROM nhaphang");
    console.log("👉 Cấu trúc bảng nhaphang:");
    console.table(cols);
  } catch (err) {
    console.error("❌ Lỗi khi kiểm tra DB:", err.message);
  }
})();

// Mount API
app.use("/api/menu", require("./api/menu"));
app.use("/api/nguyenlieu", require("./api/nguyenlieu"));
app.use("/api/nhaphang", require("./api/nhaphang"));
app.use("/api/congthuc", require("./api/congthuc"));
app.use("/api/soatbill", require("./api/soatbill"));
app.use("/api/xuatbuffet", require("./api/xuatbuffet"));
app.use("/api/kiemtoan", require("./api/kiemtoan"));



// Fallback cho SPA frontend
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Chạy server
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
