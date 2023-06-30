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
const userRequest_dto_1 = require("../dto/userRequest.dto");
const userRepository_1 = __importDefault(require("../repository/userRepository"));
function getAll(page, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield userRepository_1.default.getAll(page, limit);
    });
}
function getById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield userRepository_1.default.getById(userId);
    });
}
function post(request) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield userRepository_1.default.post(new userRequest_dto_1.UserRequest(request));
    });
}
function put(newuser, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield userRepository_1.default.put(newuser, id);
    });
}
function deleteById(userId) {
    return userRepository_1.default.deleteById(userId);
}
exports.default = {
    getAll,
    getById,
    post,
    put,
    deleteById,
};
