require('dotenv').config();
const express = require('express');
const connection = require('./db'); // import kết nối DB
const app = express();

const PORT = process.env.PORT || 3000;

// Kiểm tra kết nối DB trước khi start server
connection.ping(err => {
  if (err) {
    console.error('❌ DB không phản hồi:', err);
    process.exit(1);
  } else {
    console.log('✅ DB đã sẵn sàng!');

    app.listen(PORT, () => {
      console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
    });
  }
});
