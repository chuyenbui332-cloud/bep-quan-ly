require('dotenv').config();
const express = require('express');
const connection = require('./db'); // import kết nối DB
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware để parse body JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kiểm tra kết nối DB trước khi start server
connection.connect(err => {
  if (err) {
    console.error('❌ Lỗi kết nối DB:', err);
    process.exit(1);
  } else {
    console.log('✅ DB đã kết nối thành công!');

    app.listen(PORT, () => {
      console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
    });
  }
});
