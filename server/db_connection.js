const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
	host : process.env.DATABASE_HOST,
	user : process.env.DATABASE_USER,
	password : process.env.DATABASE_PASSWORD,
	database : process.env.DATABASE_NAME
});

connection.connect((err => {
    if(err) throw err;
    console.log(`MySQL Connected`);
}));

exports.db_connection = connection;

// const { Pool } = require('pg');

// const pool = new Pool({
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   host: process.env.DATABASE_HOST,
//   port: process.env.DATABASE_PORT, // default Postgres port
//   database: process.env.DATABASE_NAME
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params)
// };