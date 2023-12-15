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
exports.deleteById = exports.change_password = exports.put = exports.post = exports.getById = exports.getAll = void 0;
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loggerr = (0, pino_1.default)((0, pino_pretty_1.default)());
const User_1 = __importDefault(require("../models/User"));
const user_dto_1 = require("../dto/user.dto");
function getAll(page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield User_1.default.findAll({
                offset: (page - 1) * size,
                limit: size,
                order: [['id', 'ASC']]
            });
            if (users.length > 0) {
                loggerr.info("Users exists.");
                return users;
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
        const user = yield User_1.default.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }
        return new user_dto_1.UserDTO(user);
    });
}
exports.getById = getById;
function post(userRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.default.create(userRequest);
            loggerr.info("Data has been saved!");
            return user;
        }
        catch (error) {
            loggerr.error(error);
            throw new Error("Repository post error");
        }
    });
}
exports.post = post;
function put(userDTO, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.default.update(userDTO, {
                where: { id: id }
            });
            loggerr.info("User with ID:" + id + " updated successfully.");
            return user;
        }
        catch (error) {
            loggerr.error(error);
            throw new Error("Repository put error");
        }
    });
}
exports.put = put;
function change_password(userDTO, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(userDTO.password, saltRounds);
        try {
            const user = yield User_1.default.update({ username: userDTO.username, login: userDTO.login, password: hashedPassword }, {
                where: { id: id }
            });
            loggerr.info("User with ID:" + id + " updated successfully.");
            return user;
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
            yield User_1.default.destroy({
                where: { id: id }
            });
        }
        catch (err) {
            loggerr.error(err);
            throw new Error("Repository deleteById error");
        }
    });
}
exports.deleteById = deleteById;
