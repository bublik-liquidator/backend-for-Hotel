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
const roomBookingService_1 = __importDefault(require("../service/roomBookingService"));
const roomBooking_dto_1 = require("../dto/roomBooking.dto");
const roomBookingRequest_dto_1 = require("../dto/roomBookingRequest.dto");
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const loggerr = (0, pino_1.default)((0, pino_pretty_1.default)());
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware/middleware");
const router = express_1.default.Router();
/**
 * @swagger
 * /room_booking/:
 *   get:
 *     tags:
 *       - Rooms
 *     name: Get all rooms
 *     summary: Get all rooms with pagination
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
 *         description: A list of rooms
 *       '404':
 *         description: Rooms not found
 *       '500':
 *         description: Room Server Error with get all
 */
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 10;
    try {
        const result = yield roomBookingService_1.default.getAll(page, limit);
        if (!result) {
            return res.status(404).json({ message: 'Room not found' });
        }
        return res.status(200).json(result);
    }
    catch (err) {
        loggerr.error(err);
        return res.status(500).json({ error: 'Room Server Error with get all' });
    }
}));
/**
 * @swagger
 * /room_booking/{id}:
 *   get:
 *     tags:
 *       - Rooms
 *     name: Get room by ID
 *     summary: Get a single room by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the room to get
 *     responses:
 *       '200':
 *         description: A single room
 *       '404':
 *         description: Room not found
 *       '500':
 *         description: Internal Server Error with get by id
 */
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const hotelRoom = yield roomBookingService_1.default.getById(id);
        if (!hotelRoom) {
            return res.status(404).json({ error: 'Hotel not found' });
        }
        return res.status(200).json(new roomBooking_dto_1.RoomBooking(hotelRoom));
    }
    catch (err) {
        loggerr.error(err);
        return res.status(500).json({ error: 'Internal Server Error with get by id' });
    }
}));
/**
 * @swagger
 * /room_booking/:
 *   post:
 *     tags:
 *       - Rooms
 *     name: Create a new room
 *     summary: Create a new room
 *     responses:
 *       '200':
 *         description: Room created successfully
 *       '500':
 *         description: Internal Server Error with post
 */
router.post("/", middleware_1.isUserOrAdminOrManager, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let hotelRoom = yield roomBookingService_1.default.post(req.body);
    return res.json(new roomBookingRequest_dto_1.RoomBookingRequest(hotelRoom));
}));
/**
 * @swagger
 * /room_booking/check:
 *   post:
 *     tags:
 *       - Rooms
 *     name: Check room availability
 *     summary: Check room availability
 *     responses:
 *       '200':
 *         description: Room availability status
 *       '500':
 *         description: Internal Server Error with check
 */
router.post("/check", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let hotelRoom = yield roomBookingService_1.default.postCheck(req.body);
    return res.json((hotelRoom));
}));
/**
* @swagger
* /room_booking/account/{id}:
*   get:
*     tags:
*       - Rooms
*     name: Get account by ID
*     summary: Get account by ID
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: Numeric ID of the account to get
*     responses:
*       '200':
*         description: Account details
*       '400':
*         description: Invalid id
*       '500':
*         description: Internal Server Error with get by id
*/
router.get("/account/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid id' });
    }
    const account = yield roomBookingService_1.default.getAccount(id);
    return res.json(account);
}));
/**
 * @swagger
 * /room_booking/{id}:
 *   put:
 *     tags:
 *       - Rooms
 *     name: Update room by ID
 *     summary: Update room by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the room to update
 *     responses:
 *       '201':
 *         description: Room updated successfully
 *       '404':
 *         description: Room not found
 *       '500':
 *         description: Internal Server Error with put by id
 */
router.put("/:id", middleware_1.isUserOrAdminOrManager, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const hotelRoom = yield roomBookingService_1.default.getById(id);
        if (!hotelRoom) {
            return res.status(404).json({ error: 'hotelRoom not found' });
        }
        const result = yield roomBookingService_1.default.put(req.body, parseInt(req.params.id));
        return res.status(201).json(new roomBooking_dto_1.RoomBooking(result));
    }
    catch (err) {
        loggerr.error(err);
        return res.status(500).json({ error: 'Internal Server Error with put by id' });
    }
}));
/**
 * @swagger
 * /room_booking/{id}:
 *   delete:
 *     tags:
 *       - Rooms
 *     name: Delete room by ID
 *     summary: Delete room by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the room to delete
 *     responses:
 *       '200':
 *         description: Room deleted successfully
 *       '404':
 *         description: Room not found
 *       '500':
 *         description: Internal Server Error with delete by id
 */
router.delete("/:id", middleware_1.isUserOrAdminOrManager, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const hotelRoom = yield roomBookingService_1.default.getById(id);
        if (!hotelRoom) {
            return res.status(404).json({ error: 'hotelRoom not found' });
        }
        yield roomBookingService_1.default.deleteById(parseInt(req.params.id));
        return res.status(200).json({ message: 'hotelRoom deleted successfully.' });
    }
    catch (err) {
        loggerr.error(err);
        return res.status(500).json({ error: 'Internal Server Error with delete by id' });
    }
}));
exports.default = router;
