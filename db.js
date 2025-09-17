require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection(process.env.MYSQL_URL);

connection.connect(err => {
  if (err) {
    console.error('❌ Lỗi kết nối DB:', err);
    process.exit(1);
  } else {
    console.log('✅ Đã kết nối DB thành công!');
  }
});

module.exports = connection;
