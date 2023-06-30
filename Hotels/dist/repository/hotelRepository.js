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
            const result = yield dbProvider_1.default.pool.query("SELECT * FROM hotel ORDER BY id OFFSET $1 LIMIT $2", [(page - 1) * size, size]);
            if (result.rows.length > 0) {
                loggerr.info("hotels exist.");
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
            const result = yield dbProvider_1.default.pool.query(`SELECT * FROM hotel WHERE id = ${id}`);
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
function post(hotel) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "INSERT INTO hotel(name, manager_id,path_picture) VALUES($1, $2, $3) RETURNING *";
        const values = [hotel.name, hotel.manager_id, hotel.path_picture];
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
function put(hotel, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "UPDATE hotel SET name = $1, manager_id = $2, path_picture = $3 WHERE id = $4 RETURNING *";
        const values = [hotel.name, hotel.manager_id, hotel.path_picture, id];
        try {
            const res = yield dbProvider_1.default.pool.query(query, values);
            loggerr.info("Hotel with ID:" + id + " updated successfully.");
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
            yield dbProvider_1.default.pool.query(`DELETE FROM hotel WHERE id = ${id}`);
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
};