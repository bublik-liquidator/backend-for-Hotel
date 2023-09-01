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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var roomBookingService_1 = require("../service/roomBookingService");
var roomBooking_dto_1 = require("../dto/roomBooking.dto");
var roomBookingRequest_dto_1 = require("../dto/roomBookingRequest.dto");
var pino_1 = require("pino");
var pino_pretty_1 = require("pino-pretty");
var loggerr = pino_1["default"](pino_pretty_1["default"]());
var express_1 = require("express");
var router = express_1["default"].Router();
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, limit, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                page = parseInt(req.query.page) || 1;
                limit = parseInt(req.query.limit) || 10;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, roomBookingService_1["default"].getAll(page, limit)];
            case 2:
                result = _a.sent();
                if (!result) {
                    return [2 /*return*/, res.status(404).json({ error: 'Room not found' })];
                }
                return [2 /*return*/, res.status(200).json(result)];
            case 3:
                err_1 = _a.sent();
                loggerr.error(err_1);
                return [2 /*return*/, res.status(500).json({ error: 'Room Server Error with get all' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, hotelRoom, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, roomBookingService_1["default"].getById(id)];
            case 1:
                hotelRoom = _a.sent();
                if (!hotelRoom) {
                    return [2 /*return*/, res.status(404).json({ error: 'Hotel not found' })];
                }
                return [2 /*return*/, res.status(200).json(new roomBooking_dto_1.RoomBooking(hotelRoom))];
            case 2:
                err_2 = _a.sent();
                loggerr.error(err_2);
                return [2 /*return*/, res.status(500).json({ error: 'Internal Server Error with get by id' })];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var hotelRoom;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, roomBookingService_1["default"].post(req.body)];
            case 1:
                hotelRoom = _a.sent();
                return [2 /*return*/, res.json(new roomBookingRequest_dto_1.RoomBookingRequest(hotelRoom))];
        }
    });
}); });
router.post("/check", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var hotelRoom;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, roomBookingService_1["default"].postCheck(req.body)];
            case 1:
                hotelRoom = _a.sent();
                return [2 /*return*/, res.json((hotelRoom))];
        }
    });
}); });
router.post("/account", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, roomBookingService_1["default"].postAccount(req.body)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.json((user))];
        }
    });
}); });
router.put("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, hotelRoom, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, roomBookingService_1["default"].getById(id)];
            case 1:
                hotelRoom = _a.sent();
                if (!hotelRoom) {
                    return [2 /*return*/, res.status(404).json({ error: 'hotelRoom not found' })];
                }
                return [4 /*yield*/, roomBookingService_1["default"].put(req.body, parseInt(req.params.id))];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(201).json(new roomBooking_dto_1.RoomBooking(result))];
            case 3:
                err_3 = _a.sent();
                loggerr.error(err_3);
                return [2 /*return*/, res.status(500).json({ error: 'Internal Server Error with put by id' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router["delete"]("/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, hotelRoom, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, roomBookingService_1["default"].getById(id)];
            case 1:
                hotelRoom = _a.sent();
                if (!hotelRoom) {
                    return [2 /*return*/, res.status(404).json({ error: 'hotelRoom not found' })];
                }
                return [4 /*yield*/, roomBookingService_1["default"].deleteById(parseInt(req.params.id))];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: 'hotelRoom deleted successfully.' })];
            case 3:
                err_4 = _a.sent();
                loggerr.error(err_4);
                return [2 /*return*/, res.status(500).json({ error: 'Internal Server Error with delete by id' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;