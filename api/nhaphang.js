const express = require("express");
const pool = require("../db");
const router = express.Router();

// Lấy danh sách nguyên liệu
router.get("/nguyenlieu", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT idnl AS idnl, tennl AS tennl, donvi FROM nguyenlieu"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Thêm nhập hàng
router.post("/", async (req, res) => {
  const { idnl, tennl, soluong, donvi, ngaynhap } = req.body;
console.log("Data gửi vào:", idnl, tennl, soluong, donvi, ngaynhap);
  if (!idnl) {
    return res.status(400).json({ error: "Nguyên liệu không hợp lệ" });
  }

  try {

const [db] = await pool.query("SELECT DATABASE() AS db");
    console.log("👉 Node đang dùng DB:", db[0].db);

    const [cols] = await pool.query("SHOW COLUMNS FROM nhaphang");
    console.log("👉 Cột trong nhaphang:");
    console.table(cols);

    await pool.query(
      "INSERT INTO nhaphang (idnl, tennl, soluong, donvi, ngaynhap) VALUES (?, ?, ?, ?, ?)",
      [idnl, tennl, soluong, donvi, ngaynhap]
    );
    res.json({ message: "✅ Nhập hàng thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Tìm kiếm nhập hàng theo khoảng thời gian
router.get("/search", async (req, res) => {
  const { from, to } = req.query;
  if (!from || !to) {
    return res.status(400).json({ error: "Thiếu tham số from/to" });
  }

  try {
    const [rows] = await pool.query(
      "SELECT * FROM nhaphang WHERE ngaynhap BETWEEN ? AND ? ORDER BY ngaynhap DESC",
      [from, to]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
