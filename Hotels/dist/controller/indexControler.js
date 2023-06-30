"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const express_1 = __importDefault(require("express"));
const pino_1 = __importDefault(require("pino"));
const router = express_1.default.Router();
router.get("/", (request, response) => {
    (0, console_1.debug)('Calling response.json');
    (0, pino_1.default)({ level: process.env.LOG_LEVEL || 'info' }).debug('Calling response.json');
    response.json({ info: "Node.js + Express + Postgres API = meetup.app" });
});
exports.default = router;
