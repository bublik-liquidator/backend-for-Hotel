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
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const logger = (0, pino_1.default)((0, pino_pretty_1.default)());
const SECRET_KEY = process.env.SECRET_KEY;
function authenticateUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundUser = yield User_1.default.findOne({ where: { login: user.login } });
            if (!foundUser) {
                logger.error("User not found!");
                throw new Error("Invalid credentials");
            }
            const passwordMatch = yield bcrypt_1.default.compare(user.password, foundUser.password);
            if (!passwordMatch) {
                logger.error("Invalid password!");
                throw new Error("Invalid credentials");
            }
            const token = jsonwebtoken_1.default.sign({ id: foundUser.id, role: foundUser.role }, SECRET_KEY);
            logger.info("User authenticated!");
            return token;
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
    });
}
;
exports.default = { authenticateUser };
