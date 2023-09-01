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
exports.userRepository = void 0;
const pg_1 = require("pg");
const bcrypt_1 = __importDefault(require("bcrypt"));
const pool = new pg_1.Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Q156ap',
    database: 'postgres'
});
exports.userRepository = {
    findUserByEmail(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield pool.query('SELECT * FROM users WHERE login = $1', [login]);
            return result.rows[0];
        });
    },
    createUser(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            console.log(login + "login");
            yield pool.query('INSERT INTO users (login, password) VALUES ($1, $2)', [login, hashedPassword]);
        });
    }
};
