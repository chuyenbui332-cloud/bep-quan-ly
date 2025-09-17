require('dotenv').config();
import mysql from "mysql2/promise";

const connection = await mysql.createConnection(process.env.MYSQL_URL);

export default connection;


module.exports = connection;
