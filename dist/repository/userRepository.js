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
exports.change_password = exports.deleteById = exports.put = exports.post = exports.getById = exports.getAll = void 0;
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const loggerr = (0, pino_1.default)((0, pino_pretty_1.default)());
const dbProvider_1 = __importDefault(require("../config/dbProvider"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function getAll(page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield dbProvider_1.default.pool.query("SELECT * FROM users ORDER BY id OFFSET $1 LIMIT $2", [(page - 1) * size, size]);
            if (result.rows.length > 0) {
                loggerr.info("user exist.");
                return result.rows;
            }
            else {
                loggerr.info("I didn't find it.");
                return 0;
            }
        }
        catch (err) {
            loggerr.error(err);
            throw new Error("Repository getAll error");
        }
    });
}
exports.getAll = getAll;
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield dbProvider_1.default.pool.query(`SELECT * FROM users WHERE id = ${id}`);
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
exports.getById = getById;
function post(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "INSERT INTO users(username, photo, phonenomber, password, many, email, birthday, login,role) VALUES($1, $2, $3, $4, $5, $6, $7, $8,$9) RETURNING *";
        const values = [user.username, user.photo, user.phonenomber, user.password, user.many, user.email, user.birthday, user.login, user.role];
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
exports.post = post;
;
function put(user, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(user.password, saltRounds);
        const query = "UPDATE users SET username = $1, photo = $2, phonenomber = $3, many = $4, email = $5, birthday = $6,role = $7 WHERE id = $8 RETURNING *";
        const values = [user.username, user.photo, user.phonenomber, user.many, user.email, user.birthday, user.role, id];
        try {
            const res = yield dbProvider_1.default.pool.query(query, values);
            loggerr.info("user with ID:" + id + " updated successfully.");
            return res.rows[0];
        }
        catch (error) {
            loggerr.error(error);
            throw new Error("Repository put error");
        }
    });
}
exports.put = put;
function change_password(user, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(user.password, saltRounds);
        const query = "UPDATE users SET username = $1, login=$2, password = $3 WHERE id = $4 RETURNING *";
        const values = [user.username, user.login, hashedPassword, id];
        try {
            const res = yield dbProvider_1.default.pool.query(query, values);
            loggerr.info("user with ID:" + id + " updated successfully.");
            return res.rows[0];
        }
        catch (error) {
            loggerr.error(error);
            throw new Error("Repository put error");
        }
    });
}
exports.change_password = change_password;
function deleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield dbProvider_1.default.pool.query(`DELETE FROM users WHERE id = ${id}`);
        }
        catch (err) {
            loggerr.error(err);
            throw new Error("Repository deleteById error");
        }
    });
}
exports.deleteById = deleteById;
