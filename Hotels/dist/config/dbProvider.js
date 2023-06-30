"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pool = require("pg").Pool;
const pool = new Pool({
    user: process.env.POSTGRESQL_USER,
    host: process.env.POSTGRESQL_HOST,
    database: process.env.POSTGRESQL_DB_NAME,
    password: process.env.POSTGRESQL_PASSWORD,
    port: process.env.POSTGRESQL_PORT,
});
exports.default = {
    pool
};
