import { debug } from 'console';
import express, { Express, NextFunction, Request, Response } from 'express';
import pino from 'pino';

import { Router } from 'express';
const router: Router = express.Router();

router.get("/", (request, response) => {
  debug('Calling response.json');
  pino({ level: process.env.LOG_LEVEL || 'info' }).debug('Calling response.json')
  response.json({ info: "Node.js + Express + Postgres API = meetup.app" });
});
export default router;
