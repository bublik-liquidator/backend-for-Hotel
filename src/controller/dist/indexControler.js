"use strict";
exports.__esModule = true;
var console_1 = require("console");
var express_1 = require("express");
var pino_1 = require("pino");
var router = express_1["default"].Router();
router.get("/", function (request, response) {
    console_1.debug('Calling response.json');
    pino_1["default"]({ level: process.env.LOG_LEVEL || 'info' }).debug('Calling response.json');
    response.json({ info: "Node.js + Express + Postgres API = meetup.app" });
});
exports["default"] = router;
