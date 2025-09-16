// api/congthuc.js
const express = require("express");
const pool = require("../db");
const router = express.Router();

// Lấy công thức theo món
router.get("/tenmon/:idmon", async (req, res) => {
  const { idmon } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM congthuc WHERE idmon = ?", [idmon]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Thêm nguyên liệu vào công thức
router.post("/", async (req, res) => {
  const { idmon, idnl, tennl, donvi, soluong } = req.body;
  try {
    await pool.query(
      "INSERT INTO congthuc (idmon, idnl, tennl, donvi, soluong) VALUES (?, ?, ?, ?, ?)",
      [idmon, idnl, tennl, donvi, soluong]
    );
    res.json({ message: "Đã thêm nguyên liệu vào công thức", idmon });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Xóa 1 nguyên liệu khỏi công thức
router.delete("/:idmon/:idnl", async (req, res) => {
  const { idmon, idnl } = req.params;
  try {
    await pool.query(
      "DELETE FROM congthuc WHERE idmon = ? AND idnl = ?",
      [idmon, idnl]
    );
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
