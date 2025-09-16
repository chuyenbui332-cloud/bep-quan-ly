// api/menu.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// Lấy tất cả món ăn
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM menu ORDER BY idmon ASC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Thêm món ăn
router.post("/", async (req, res) => {
  const { tenmon, giatien } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO menu (tenmon, giatien) VALUES (?, ?)",
      [tenmon, giatien]
    );
    res.json({ idmon: result.insertId, tenmon, giatien });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sửa món ăn
router.put("/:idmon", async (req, res) => {
  const { idmon } = req.params;
  const { tenmon, giatien } = req.body;
  try {
    await pool.query("UPDATE menu SET tenmon=?, giatien=? WHERE idmon=?", [tenmon, giatien, idmon]);
    res.json({ idmon, tenmon, giatien });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Xóa món ăn
router.delete("/:idmon", async (req, res) => {
  const { idmon } = req.params;
  try {
    await pool.query("DELETE FROM menu WHERE idmon=?", [idmon]);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
