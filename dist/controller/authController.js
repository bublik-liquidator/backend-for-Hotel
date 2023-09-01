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
const passport_1 = __importDefault(require("passport"));
const authService_1 = require("../service/authService");
const router = express_1.default.Router();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login, password } = req.body;
        yield authService_1.authService.register(login, password);
        res.sendStatus(201);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login, password } = req.body;
        const token = yield authService_1.authService.login(login, password);
        res.json({ token });
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
router.get('/protected', passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    res.send('Protected route');
});
exports.default = router;
