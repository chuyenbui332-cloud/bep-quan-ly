// api/soatbill.js
const express = require("express");
const router = express.Router();
const db = require("../db"); // pool từ db.js (mysql2/promise)

// 2) Thêm 1 bill
// POST /api/soatbill
// body: { id_monan, ten_monan, soluong, ngay }
router.post("/", async (req, res) => {
  const { idmon, tenmon, soluong, ngaylap } = req.body;
  if (!idmon || !tenmon || !soluong || !ngaylap) {
    return res.status(400).json({ error: "Thiếu dữ liệu (idmon/tenmon/soluong/ngaylap)" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO bill (idmon, tenmon, soluong, ngaylap) VALUES (?, ?, ?, ?)",
      [idmon, tenmon, soluong, ngaylap]
    );
    res.json({ success: true, insertId: result.insertId });
  } catch (err) {
    console.error("soatbill POST error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Tìm kiếm nhập hàng theo khoảng thời gian
router.get("/search", async (req, res) => {
  const { from, to } = req.query;
  try {
    const [rows] = await db.query(
      "SELECT * FROM bill WHERE ngaylap BETWEEN ? AND ? ORDER BY ngaylap DESC",
      
      [from, to]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
