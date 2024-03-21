"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hotelRoomService_1 = __importDefault(require("../service/hotelRoomService"));
const hotelRoom_dto_1 = require("../dto/hotelRoom.dto");
const hotelRoomRequest_dto_1 = require("../dto/hotelRoomRequest.dto");
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const loggerr = (0, pino_1.default)((0, pino_pretty_1.default)());
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware/middleware");
const router = express_1.default.Router();
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
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 10;
    try {
        const result = yield hotelRoomService_1.default.getAll(page, limit);
        if (!result) {
            return res.status(404).json({ error: 'Hotel_room not found' });
        }
        return res.status(200).json(result);
    }
    catch (err) {
        loggerr.error(err);
        return res.status(500).json({ error: 'Hotel Server Error with get all' });
    }
}));
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
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const hotelRoom = yield hotelRoomService_1.default.getById(id);
        if (!hotelRoom) {
            return res.status(404).json({ error: 'Hotel not found' });
        }
        return res.status(200).json(new hotelRoom_dto_1.HotelRoomDTO(hotelRoom));
    }
    catch (err) {
        loggerr.error(err);
        return res.status(500).json({ error: 'Internal Server Error with get by id' });
    }
}));
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
router.post("/", middleware_1.isAdminOrManager, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let hotelRoom = yield hotelRoomService_1.default.post(req.body);
    return res.json(new hotelRoomRequest_dto_1.HotelRoomRequest(hotelRoom));
}));
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
router.put("/:id", middleware_1.isAdminOrManager, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const hotelRoom = yield hotelRoomService_1.default.getById(id);
        if (!hotelRoom) {
            return res.status(404).json({ error: 'hotelRoom not found' });
        }
        const result = yield hotelRoomService_1.default.put(req.body, parseInt(req.params.id));
        if (result) {
            return res.status(201).json(new hotelRoom_dto_1.HotelRoomDTO(result));
        }
        else {
            return res.status(404).json({ error: 'Update failed, hotelRoom not found' });
        }
    }
    catch (err) {
        loggerr.error(err);
        return res.status(500).json({ error: 'Internal Server Error with put by id' });
    }
}));
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
router.delete("/:id", middleware_1.isAdminOrManager, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const hotelRoom = yield hotelRoomService_1.default.getById(id);
        if (!hotelRoom) {
            return res.status(404).json({ error: 'hotelRoom not found' });
        }
        yield hotelRoomService_1.default.deleteById(parseInt(req.params.id));
        return res.status(200).json({ message: 'hotelRoom deleted successfully.' });
    }
    catch (err) {
        loggerr.error(err);
        return res.status(500).json({ error: 'Internal Server Error with delete by id' });
    }
}));
exports.default = router;
