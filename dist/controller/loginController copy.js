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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const loggerr = (0, pino_1.default)((0, pino_pretty_1.default)());
const loginService_1 = __importDefault(require("../service/loginService"));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var login = (0, loginService_1.default)(req.body);
    // loggerr.info("test"); 
    if (login == null) {
        res.status(401).send();
    }
    else {
        return res.json(login);
    }
}));
exports.default = router;
