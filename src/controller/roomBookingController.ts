

import hotelRoomService from "../service/roomBookingService"
import { RoomBooking } from "../dto/roomBooking.dto";
import { RoomBookingRequest } from "../dto/roomBookingRequest.dto";

import pino from 'pino';
import pretty from 'pino-pretty';
const loggerr = pino(pretty());

import express, {  Router } from 'express';
const router: Router = express.Router();

router.get("/", async (req, res) => {
   var page: number = parseInt(req.query.page as string)|| 1;
  var limit: number = parseInt(req.query.limit as string)|| 10;  
  try {    
    const result = await hotelRoomService.getAll(page, limit);
    if (!result) {
      return res.status(404).json({ message: 'Room not found' });
    }
    return res.status(200).json(result);

  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'Room Server Error with get all' });
  }

});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const hotelRoom = await hotelRoomService.getById(id);
    if (!hotelRoom) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    return res.status(200).json(new RoomBooking(hotelRoom));
  } catch (err) {
    loggerr.error(err); 
    return res.status(500).json({ error: 'Internal Server Error with get by id' });
  }

});

router.post("/", async (req, res) => {
  let hotelRoom = await hotelRoomService.post(req.body) 
  return res.json(new RoomBookingRequest(hotelRoom));
});

router.post("/check", async (req, res) => {
  let hotelRoom = await hotelRoomService.postCheck(req.body) 
  return res.json((hotelRoom));
});

router.post("/account", async (req, res) => {
  let id = await hotelRoomService.postAccount(req.body.id) 
  return res.json((id));
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const hotelRoom = await hotelRoomService.getById(id);
    if (!hotelRoom) {
      return res.status(404).json({ error: 'hotelRoom not found' });
    }
    const result = await hotelRoomService.put(req.body, parseInt(req.params.id));
    return res.status(201).json(new RoomBooking(result));
  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'Internal Server Error with put by id' });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const hotelRoom = await hotelRoomService.getById(id);
    if (!hotelRoom) {
      return res.status(404).json({ error: 'hotelRoom not found' });
    } 
    await hotelRoomService.deleteById(parseInt(req.params.id))
    return res.status(200).json({ message: 'hotelRoom deleted successfully.' });
  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'Internal Server Error with delete by id' });
  }

});

export default router;
