const express = require('express');
const router = express.Router();

router.get("/", (request, response) => {
    debug('Calling response.json');
   pino({level: process.env.LOG_LEVEL || 'info'}).debug('Calling response.json')
    response.json({ info: "Node.js + Express + Postgres API = meetup.app" });
});
module.exports = router;