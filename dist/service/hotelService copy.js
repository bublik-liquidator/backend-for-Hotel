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
const hotelRequest_dto_1 = require("../dto/hotelRequest.dto");
const hotelRepository_1 = __importDefault(require("../repository/hotelRepository"));
function getAll(page, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield hotelRepository_1.default.getAll(page, limit);
    });
}
function getById(meetupId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield hotelRepository_1.default.getById(meetupId);
    });
}
function post(request) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield hotelRepository_1.default.post(new hotelRequest_dto_1.HotelRequest(request));
    });
}
function put(newmeetup, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield hotelRepository_1.default.put(newmeetup, id);
    });
}
function deleteById(meetupId) {
    return hotelRepository_1.default.deleteById(meetupId);
}
exports.default = {
    getAll,
    getById,
    post,
    put,
    deleteById,
};
