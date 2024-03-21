

import hotelRoomService from "../service/hotelRoomService"
import { HotelRoomDTO } from "../dto/hotelRoom.dto";
import { HotelRoomRequest } from "../dto/hotelRoomRequest.dto";
import pino from 'pino';
import pretty from 'pino-pretty';
const loggerr = pino(pretty());

import express, {  Router } from 'express';
import { isAdminOrManager, isUser, isUserOrAdminOrManager } from "../middleware/middleware";
const router: Router = express.Router();
/**
 * @swagger
 * /hotel/{id}/assign_manager:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Hotels
 *     name: Assign manager to hotel
 *     summary: Assign manager to hotel
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the hotel to assign manager
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - manager_id
 *             properties:
 *               manager_id:
 *                 type: number
 *                 example: 1
 *     responses:
 *       '201':
 *         description: Manager assigned successfully
 *       '500':
 *         description: Internal Server Error with assign manager
 */

router.get("/", async (req, res) => {
   var page: number = parseInt(req.query.page as string)|| 1;
  var limit: number = parseInt(req.query.limit as string)|| 10;  
  try {    
    const result = await hotelRoomService.getAll(page, limit);
    if (!result) {
      return res.status(404).json({ error: 'Hotel_room not found' });
    }
    return res.status(200).json(result);

  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'Hotel Server Error with get all' });
  }

});
/**
 * @swagger
 * /hotel_room/{id}:
 *   get:
 *     tags:
 *       - Hotel Rooms
 *     name: Get hotel room by ID
 *     summary: Get a single hotel room by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the hotel room to get
 *     responses:
 *       '200':
 *         description: A single hotel room
 *       '404':
 *         description: Hotel room not found
 *       '500':
 *         description: Internal Server Error with get by id
 */

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const hotelRoom = await hotelRoomService.getById(id);
    if (!hotelRoom) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    return res.status(200).json(new HotelRoomDTO(hotelRoom));
  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'Internal Server Error with get by id' });
  }

});
/**
 * @swagger
 * /hotel_room/:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Hotel Rooms
 *     name: Create a new hotel room
 *     summary: Create a new hotel room
 *     responses:
 *       '200':
 *         description: Hotel room created successfully
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Registration error
 */

router.post("/",isAdminOrManager, async (req, res) => {
  let hotelRoom = await hotelRoomService.post(req.body) 
  return res.json(new HotelRoomRequest(hotelRoom));
});
/**
 * @swagger
 * /hotel_room/{id}:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Hotel Rooms
 *     name: Update hotel room by ID
 *     summary: Update hotel room by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the hotel room to update
 *     responses:
 *       '201':
 *         description: Hotel room updated successfully
 *       '404':
 *         description: Update failed, hotel room not found
 *       '500':
 *         description: Internal Server Error with put by id
 */

router.put("/:id",isAdminOrManager, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const hotelRoom = await hotelRoomService.getById(id);
    if (!hotelRoom) {
      return res.status(404).json({ error: 'hotelRoom not found' });
    }
    const result = await hotelRoomService.put(req.body, parseInt(req.params.id));
    if (result) {
      return res.status(201).json(new HotelRoomDTO(result));
    } else {
      return res.status(404).json({ error: 'Update failed, hotelRoom not found' });
    }
  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'Internal Server Error with put by id' });
  }
});

/**
 * @swagger
 * /hotel_room/{id}:
 *   delete:
 *     tags:
 *       - Hotel Rooms
 *     name: Delete hotel room by ID
 *     summary: Delete hotel room by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the hotel room to delete
 *     responses:
 *       '200':
 *         description: Hotel room deleted successfully
 *       '404':
 *         description: Hotel room not found
 *       '500':
 *         description: Internal Server Error with delete by id
 */

router.delete("/:id",isAdminOrManager, async (req, res) => {
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
