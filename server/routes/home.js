
const express = require("express");
const router = express.Router();
const db = require("../db_connection.js").db_connection;

router.use(express.json());
