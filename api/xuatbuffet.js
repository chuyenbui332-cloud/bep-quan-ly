const express = require("express");
const pool = require("../db");
const router = express.Router();

// Lấy danh sách nguyên liệu để gợi ý
router.get("/nguyenlieu", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM nguyenlieu");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Thêm xuất hàng (tự tính thanhtien) — *chỉ thay thế phần bên trong try*
router.post("/", async (req, res) => {
  const { idnl, tennl, soluong, donvi, ngay } = req.body;
  console.log("👉 Dữ liệu nhận được:", req.body);

  try {
    await pool.query(
      "INSERT INTO xuatbuffet (idnl, tennl, soluong, donvi, ngay) VALUES (?, ?, ?, ?, ?)",
      [idnl, tennl, soluong, donvi, ngay]
    );

    res.json({ message: "✅ Đã xuất hàng thành công" });
  } catch (err) {
    console.error("❌ Lỗi SQL:", err);
    res.status(500).json({ error: err.message });
  }
});




// Tìm kiếm nhập hàng theo khoảng thời gian
router.get("/search", async (req, res) => {
  const { from, to } = req.query;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM xuatbuffet WHERE ngay BETWEEN ? AND ? ORDER BY ngay DESC",
      [from, to]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
