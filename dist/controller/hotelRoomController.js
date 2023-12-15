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
const router = express_1.default.Router();
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
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let hotelRoom = yield hotelRoomService_1.default.post(req.body);
    return res.json(new hotelRoomRequest_dto_1.HotelRoomRequest(hotelRoom));
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
