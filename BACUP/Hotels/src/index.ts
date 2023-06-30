import createError from 'http-errors';
import logger from 'morgan';
import express, { Express, NextFunction, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import "reflect-metadata"

import * as dotenv from 'dotenv';
dotenv.config();

import pino from 'pino';
import pretty from 'pino-pretty';
const loggerr = pino(pretty());

import indexController from "./controller/indexControler";
import hotelController from "./controller/hotelController";
import hotelRoomController from './controller/hotelRoomController';
import loginController from "./controller/loginController";
import roomBookingController from "./controller/roomBookingController";
import userController from "./controller/userController";




const app: Express = express();
const port = process.env.INDEX_APP_PORT || 3000;

app.use(logger("dev"));
import cors from 'cors';
const corsOptions = {
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", indexController);
app.use("/api/user", userController);
app.use("/api/hotel", hotelController);
app.use("/api/hotel_room", hotelRoomController);
app.use("/api/login", loginController);
app.use("/api/room_booking", roomBookingController);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});
app.listen(port, () => {
  loggerr.info("Running on port " + port);
});
