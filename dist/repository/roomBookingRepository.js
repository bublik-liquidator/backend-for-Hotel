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
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const RoomBooking_1 = __importDefault(require("../models/RoomBooking"));
const logger = (0, pino_1.default)((0, pino_pretty_1.default)());
function getAll(page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield RoomBooking_1.default.findAll({
                offset: (page - 1) * size,
                limit: size,
                order: [['id', 'ASC']]
            });
            if (result.length > 0) {
                logger.info("Rooms exist.");
                return result;
            }
            else {
                return [];
            }
        }
        catch (err) {
            logger.error(err);
            throw new Error("Repository getAll error");
        }
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield RoomBooking_1.default.findByPk(id);
            if (result) {
                return result;
            }
            else {
                return null;
            }
        }
        catch (err) {
            logger.error(err);
            throw new Error("Repository getById error");
        }
    });
}
function post(room) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield RoomBooking_1.default.create(room);
            logger.info("Data has been saved!");
            return result;
        }
        catch (error) {
            logger.error(error);
            throw new Error("Repository post error");
        }
    });
}
function postCheck(room) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield RoomBooking_1.default.findOne({ where: { room_id: room.id } });
        return !!result;
    });
}
function postAccount(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield RoomBooking_1.default.findAll({ where: { booked_by_user_id: id } });
        return result;
    });
}
function put(room, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [affectedCount, affectedRows] = yield RoomBooking_1.default.update(room, {
                where: { id: id },
                returning: true
            });
            if (affectedCount > 0) {
                logger.info("Room with ID:" + id + " updated successfully.");
                return affectedRows[0];
            }
            else {
                throw new Error("No rows were updated");
            }
        }
        catch (error) {
            logger.error(error);
            throw new Error("Repository put error");
        }
    });
}
function deleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield RoomBooking_1.default.destroy({
                where: { id: id }
            });
        }
        catch (err) {
            logger.error(err);
            throw new Error("Repository deleteById error");
        }
    });
}
exports.default = {
    getAll,
    getById,
    post,
    put,
    deleteById,
    postCheck,
    postAccount
};
