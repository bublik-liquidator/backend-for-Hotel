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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbProvider_1 = __importDefault(require("../config/dbProvider"));
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loggerr = (0, pino_1.default)((0, pino_pretty_1.default)());
const SECRET_KEY = process.env.SECRET_KEY; // Используйте переменные окружения для хранения секретных ключей
function authenticateUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT * FROM users WHERE login = $1";
        const values = [user.login];
        try {
            const res = yield dbProvider_1.default.pool.query(query, values);
            if (res.rows.length > 0) {
                const passwordMatch = yield bcrypt_1.default.compare(user.password, res.rows[0].password);
                if (passwordMatch) {
                    const token = jsonwebtoken_1.default.sign({ id: res.rows[0].id, role: res.rows[0].role }, process.env.SECRET_KEY);
                    loggerr.info("User authenticated!");
                    return token;
                }
                else {
                    loggerr.error("Invalid password!");
                    throw new Error("Invalid password");
                }
            }
            else {
                loggerr.error("User not found!");
                throw new Error("User not found");
            }
        }
        catch (error) {
            loggerr.error(error);
            throw new Error("Repository authentication error");
        }
    });
}
;
exports.default = { authenticateUser };
