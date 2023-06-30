

import hotelService from "../service/hotelService"
import { HotelDTO } from "../dto/hotel.dto";
import { HotelRequest } from "../dto/hotelRequest.dto";
import pino from 'pino';
import pretty from 'pino-pretty';
const loggerr = pino(pretty());

import express, { Express, NextFunction, Request, Response, Router } from 'express';
const router: Router = express.Router();

router.get("/", async (req, res) => {
   var page: number = parseInt(req.query.page as string)|| 1;
  var limit: number = parseInt(req.query.limit as string)|| 10;  
  try {    
    const result = await hotelService.getAll(page, limit);
    if (!result) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    return res.status(200).json(result);

  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'Hotel Server Error with get all' });
  }

});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const hotel = await hotelService.getById(id);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    return res.status(200).json(new HotelDTO(hotel));
  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'Internal Server Error with get by id' });
  }

});

router.post("/", async (req, res) => {
  let hotel = await hotelService.post(req.body) 
  return res.json(new HotelRequest(hotel));
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const hotel = await hotelService.getById(id);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    const result = await hotelService.put(req.body, parseInt(req.params.id));
    return res.status(201).json(new HotelDTO(result));
  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'Internal Server Error with put by id' });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const hotel = await hotelService.getById(id);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    } 
    await hotelService.deleteById(parseInt(req.params.id))
    return res.status(200).json({ message: 'Hotel deleted successfully.' });
  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'Internal Server Error with delete by id' });
  }

});

export default router;
