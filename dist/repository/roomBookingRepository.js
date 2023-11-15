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
const loggerr = (0, pino_1.default)((0, pino_pretty_1.default)());
const dbProvider_1 = __importDefault(require("../config/dbProvider"));
loggerr.info(process.env.POSTGRESQL_PORT);
function getAll(page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield dbProvider_1.default.pool.query("SELECT * FROM room_booking ORDER BY id OFFSET $1 LIMIT $2", [(page - 1) * size, size]);
            if (result.rows.length > 0) {
                loggerr.info("rooms exist.");
                return result.rows;
            }
            else {
                return 0;
            }
        }
        catch (err) {
            loggerr.error(err);
            throw new Error("Repository getAll error");
        }
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield dbProvider_1.default.pool.query(`SELECT * FROM room_booking WHERE id = ${id}`);
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            else {
                return 0;
            }
        }
        catch (err) {
            loggerr.error(err);
            throw new Error("Repository getById error");
        }
    });
}
function post(room) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "INSERT INTO room_booking(room_id, booked_by_user_id, date_from, date_to, payed, number, name) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *";
        const values = [room.room_id, room.booked_by_user_id, room.date_from, room.date_to, room.payed, room.number, room.name];
        try {
            const res = yield dbProvider_1.default.pool.query(query, values);
            loggerr.info("Data has been saved!");
            return res.rows[0];
        }
        catch (error) {
            loggerr.error(error);
            throw new Error("Repository post error");
        }
    });
}
;
function postCheck(room) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield dbProvider_1.default.pool.query(`SELECT EXISTS(SELECT * FROM room_booking WHERE room_id = ${room.id})`);
        return res.rows[0].exists;
    });
}
function postAccount(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield dbProvider_1.default.pool.query(`SELECT * FROM room_booking WHERE booked_by_user_id = ${id}`);
        return result.rows;
    });
}
function put(room, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "UPDATE room_booking SET room_id = $1, booked_by_user_id = $2, date_from = $3, date_to = $4, payed = $5, number = $6, name = $7 WHERE id = $8 RETURNING *";
        const values = [room.room_id, room.booked_by_user_id, room.date_from, room.date_to, room.payed, room.number, room.name];
        try {
            const res = yield dbProvider_1.default.pool.query(query, values);
            loggerr.info("Room with ID:" + id + " updated successfully.");
            return res.rows[0];
        }
        catch (error) {
            loggerr.error(error);
            throw new Error("Repository put error");
        }
    });
}
function deleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield dbProvider_1.default.pool.query(`DELETE FROM room_booking WHERE id = ${id}`);
        }
        catch (err) {
            loggerr.error(err);
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
