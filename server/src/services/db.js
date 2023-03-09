// const mysql = require('@vlasky/mysql');

// require('dotenv').config({ path: `../.env` })

// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// module.exports = connection


const mysql = require('mysql2/promise');
require('dotenv').config({ path: `../.env` })

async function query(sql, params) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });
    const [results] = await connection.execute(sql, params);

    return results;
}

module.exports = { query }