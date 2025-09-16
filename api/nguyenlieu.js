// api/nguyenlieu.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// Lấy danh sách nguyên liệu
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM nguyenlieu ORDER BY idnl DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Thêm nguyên liệu
router.post("/", async (req, res) => {
  try {
    const { tennl, donvi, gia } = req.body;
    await pool.query("INSERT INTO nguyenlieu (tennl, donvi, gia) VALUES (?, ?, ?)", [tennl, donvi, gia]);
    res.json({ message: "Thêm nguyên liệu thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sửa nguyên liệu
router.put("/:idnl", async (req, res) => {
  try {
    const { idnl } = req.params;
    const { tennl, donvi, gia } = req.body;
    await pool.query("UPDATE nguyenlieu SET tennl=?, donvi=?, gia=? WHERE idnl=?", [tennl, donvi, gia, idnl]);
    res.json({ message: "Cập nhật nguyên liệu thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Xóa nguyên liệu
router.delete("/:idnl", async (req, res) => {
  try {
    const { idnl } = req.params;
    await pool.query("DELETE FROM nguyenlieu WHERE idnl=?", [idnl]);
    res.json({ message: "Xóa nguyên liệu thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
