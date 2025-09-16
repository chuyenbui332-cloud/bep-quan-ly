const express = require("express");
const router = express.Router();
const pool = require("../db");

// API lấy toàn bộ bảng kiểm toán
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM kiemtoan");
    res.json(rows);
  } catch (err) {
    console.error("Lỗi lấy dữ liệu kiểm toán:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
});

module.exports = router;
