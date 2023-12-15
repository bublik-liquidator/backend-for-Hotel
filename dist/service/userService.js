"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.put = exports.change_password = exports.post = exports.getById = exports.getAll = void 0;
const userRequest_dto_1 = require("../dto/userRequest.dto");
const userRepository = __importStar(require("../repository/userRepository"));
function getAll(page, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield userRepository.getAll(page, limit);
    });
}
exports.getAll = getAll;
function getById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield userRepository.getById(userId);
    });
}
exports.getById = getById;
// async function getByLogin(userLogin: string) {
//   return await userRepository.getByLogin(userLogin);
// }
function post(request) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield userRepository.post(new userRequest_dto_1.UserRequest(request));
    });
}
exports.post = post;
function put(newuser, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield userRepository.put(newuser, id);
    });
}
exports.put = put;
function change_password(newuser, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield userRepository.change_password(newuser, id);
    });
}
exports.change_password = change_password;
function deleteById(userId) {
    return userRepository.deleteById(userId);
}
exports.deleteById = deleteById;
