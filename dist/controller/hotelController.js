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
const hotelService_1 = __importDefault(require("../service/hotelService"));
const hotel_dto_1 = require("../dto/hotel.dto");
const hotelRequest_dto_1 = require("../dto/hotelRequest.dto");
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const loggerr = (0, pino_1.default)((0, pino_pretty_1.default)());
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware/middleware");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 100;
    try {
        const result = yield hotelService_1.default.getAll(page, limit);
        if (!result) {
            return res.status(404).json({ error: 'Hotel not found' });
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
        const hotel = yield hotelService_1.default.getById(id);
        if (!hotel) {
            return res.status(404).json({ error: 'Hotel not found' });
        }
        return res.status(200).json(new hotel_dto_1.HotelDTO(hotel));
    }
    catch (err) {
        loggerr.error(err);
        return res.status(500).json({ error: 'Internal Server Error with get by id' });
    }
}));
router.post("/", middleware_1.isAdminOrManager, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(middleware_1.isAdminOrManager);
    let hotel = yield hotelService_1.default.post(req.body);
    return res.json(new hotelRequest_dto_1.HotelRequest(hotel));
}));
router.put("/:id", middleware_1.isAdminOrManager, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const hotel = yield hotelService_1.default.getById(id);
        if (!hotel) {
            return res.status(404).json({ error: 'Hotel not found' });
        }
        const result = yield hotelService_1.default.put(req.body, parseInt(req.params.id));
        return res.status(201).json(new hotel_dto_1.HotelDTO(result));
    }
    catch (err) {
        loggerr.error(err);
        return res.status(500).json({ error: 'Internal Server Error with put by id' });
    }
}));
router.put("/:id/assign_manager", middleware_1.isAdminOrManager, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const managerId = parseInt(req.body.manager_id);
        const result = yield hotelService_1.default.assignManager(id, managerId);
        return res.status(201).json(new hotel_dto_1.HotelDTO(result));
    }
    catch (err) {
        loggerr.error(err);
        return res.status(500).json({ error: 'Internal Server Error with assign manager' });
    }
}));
router.delete("/:id", middleware_1.isAdminOrManager, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const hotel = yield hotelService_1.default.getById(id);
        if (!hotel) {
            return res.status(404).json({ error: 'Hotel not found' });
        }
        yield hotelService_1.default.deleteById(parseInt(req.params.id));
        res.status(200).json({ message: 'Hotel deleted successfully.' });
    }
    catch (err) {
        loggerr.error(err);
        res.status(500).json({ error: 'Internal Server Error with delete by id' });
    }
}));
exports.default = router;
