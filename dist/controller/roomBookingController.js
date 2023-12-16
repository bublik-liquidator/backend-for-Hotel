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
router.post("/", middleware_1.isUserOrAdminOrManager, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let hotelRoom = yield roomBookingService_1.default.post(req.body);
    return res.json(new roomBookingRequest_dto_1.RoomBookingRequest(hotelRoom));
}));
router.post("/check", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let hotelRoom = yield roomBookingService_1.default.postCheck(req.body);
    return res.json((hotelRoom));
}));
router.post("/account", middleware_1.isUserOrAdminOrManager, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = yield roomBookingService_1.default.postAccount(req.body.id);
    return res.json((id));
}));
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
