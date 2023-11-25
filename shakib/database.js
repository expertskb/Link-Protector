const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_SERVER || "localhost",
    user: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DATABASE_NAME || "test"
});

module.exports = db;
