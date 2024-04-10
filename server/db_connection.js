const { Pool } = require('pg');
require('dotenv').config();

const connection = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME
});

// Prints message to server console when database is queried
connection.on('connect', (client) => {
    console.log("PostgreSQL accessed.");
})

exports.db_connection = connection;