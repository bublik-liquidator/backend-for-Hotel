import createError from 'http-errors';
import logger from 'morgan';
import express, { Express, NextFunction, Request, Response } from 'express';
import * as bodyParser from 'body-parser';

import * as dotenv from 'dotenv';
dotenv.config();

import pino from 'pino';
import pretty from 'pino-pretty';
const loggerr = pino(pretty());

import indexController from "./controller/indexControler";
import hotelController from "./controller/hotelController";
import hotelRoomController from './controller/hotelRoomController';
import authController from "./controller/authController";
import regController from "./controller/regController";

import roomBookingController from "./controller/roomBookingController";
import userController from "./controller/userController";



const app: Express = express();
const port = process.env.INDEX_APP_PORT || 3000;
import cors from 'cors';
import sequelize from './config/db';
import roomReviewController from './controller/roomReviewController';
const corsOptions = {
  origin:'*', 
  credentials:true,            
  optionSuccessStatus:200,
} 

app.use(cors(corsOptions)) 

sequelize.authenticate().then(async () => {

  app.use("/api/user", userController);
  app.use(logger("dev"));

  
  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({ extended: true }));
    
  app.use("/api", indexController);
  app.use("/api/user", userController);
  app.use("/api/hotel", hotelController);
  app.use("/api/hotel_room", hotelRoomController);
  app.use("/api/auth", authController);
  app.use("/api/register", regController);
  app.use("/api/room_booking", roomBookingController);
  app.use("/api/room_review", roomReviewController);

  app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
  });
  app.listen(port);

  loggerr.info("Express server has started on port."+port);

}).catch((error: any) => console.log(error));