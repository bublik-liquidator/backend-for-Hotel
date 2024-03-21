

import hotelService from "../service/hotelService"
import { HotelDTO } from "../dto/hotel.dto";
import { HotelRequest } from "../dto/hotelRequest.dto";
import pino from 'pino';
import pretty from 'pino-pretty';
const loggerr = pino(pretty());

import express, { Express, NextFunction, Request, Response, Router } from 'express';
import { isAdmin, isAdminOrManager, isManager, isUser } from "../middleware/middleware";
const router: Router = express.Router();
/**
 * @swagger
 * /hotel/:
 *   get:
 *     tags:
 *       - Hotels
 *     name: Get all hotels
 *     summary: Get all hotels with pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items to return
 *     responses:
 *       '200':
 *         description: A list of hotels
 *       '404':
 *         description: Hotels not found
 *       '500':
 *         description: Hotel Server Error with get all
 */
router.get("/", async (req, res) => {
   var page: number = parseInt(req.query.page as string)|| 1;
  var limit: number = parseInt(req.query.limit as string)|| 100;  
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

/**
 * @swagger
 * /hotel/{id}:
 *   get:
 *     tags:
 *       - Hotels
 *     name: Get hotel by ID
 *     summary: Get a single hotel by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the hotel to get
 *     responses:
 *       '200':
 *         description: A single hotel
 *       '404':
 *         description: Hotel not found
 *       '500':
 *         description: Internal Server Error with get by id
 */
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
/**
 * @swagger
 * /hotel/:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Hotels
 *     name: Create a new hotel
 *     summary: Create a new hotel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - manager_id
 *               - path_picture
 *               - location
 *               - services
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Hotel California"
 *               manager_id:
 *                 type: number
 *                 example: 1
 *               path_picture:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["picture1.jpg", "picture2.jpg"]
 *               location:
 *                 type: string
 *                 example: "California, USA"
 *               services:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Free Wi-Fi", "Gym", "Pool"]
 *     responses:
 *       '200':
 *         description: Hotel created successfully
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Registration error
 */



router.post("/",isAdminOrManager, async (req, res) => {
  console.log(isAdminOrManager)

  let hotel = await hotelService.post(req.body) 
  return res.json(new HotelRequest(hotel));
});
/**
 * @swagger
 * /hotel/{id}:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Hotels
 *     name: Update hotel by ID
 *     summary: Update hotel by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the hotel to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - manager_id
 *               - path_picture
 *               - location
 *               - services
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Hotel California"
 *               manager_id:
 *                 type: number
 *                 example: 1
 *               path_picture:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["picture1.jpg", "picture2.jpg"]
 *               location:
 *                 type: string
 *                 example: "California, USA"
 *               services:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Free Wi-Fi", "Gym", "Pool"]
 *     responses:
 *       '201':
 *         description: Hotel updated successfully
 *       '404':
 *         description: Hotel not found
 *       '500':
 *         description: Internal Server Error with put by id
 */

router.put("/:id",isAdminOrManager, async (req, res) => {
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

router.put("/:id/assign_manager", isAdminOrManager, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const managerId = parseInt(req.body.manager_id);
    const result = await hotelService.assignManager(id, managerId);
    return res.status(201).json(new HotelDTO(result));
  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'Internal Server Error with assign manager' });
  }
});
/**
 * @swagger
 * /hotel/{id}:
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Hotels
 *     name: Delete hotel by ID
 *     summary: Delete hotel by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the hotel to delete
 *     responses:
 *       '200':
 *         description: Hotel deleted successfully
 *       '404':
 *         description: Hotel not found
 *       '500':
 *         description: Internal Server Error with delete by id
 */

router.delete("/:id",isAdminOrManager, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const hotel = await hotelService.getById(id);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    } 
    await hotelService.deleteById(parseInt(req.params.id))
    res.status(200).json({ message: 'Hotel deleted successfully.' });
  } catch (err) {
    loggerr.error(err);
     res.status(500).json({ error: 'Internal Server Error with delete by id' });
  }

});

export default router;
