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
const hotelRoomRepository_1 = __importDefault(require("../repository/hotelRoomRepository"));
const roomBookingRequest_dto_1 = require("../dto/roomBookingRequest.dto");
function getAll(page, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield hotelRoomRepository_1.default.getAll(page, limit);
    });
}
function getById(hotelRoomlId) {
    return hotelRoomRepository_1.default.getById((hotelRoomlId));
}
function post(hotelRoom) {
    return hotelRoomRepository_1.default.post(new roomBookingRequest_dto_1.RoomBookingRequest(hotelRoom));
}
function put(hotelRoom, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield hotelRoomRepository_1.default.put(hotelRoom, id);
    });
}
function deleteById(hotelRoomlId) {
    return hotelRoomRepository_1.default.deleteById((hotelRoomlId));
}
exports.default = {
    getAll,
    getById,
    post,
    put,
    deleteById,
};
