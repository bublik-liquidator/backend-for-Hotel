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
const dbProvider_1 = __importDefault(require("../config/dbProvider"));
function checkIfRecordExists(roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = {
            text: 'SELECT EXISTS(SELECT 1 FROM room_booking WHERE room_id = $1)',
            values: [roomId],
        };
        const result = yield dbProvider_1.default.pool.query(query);
        return result.rows[0].exists;
    });
}
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/:roomId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roomId = req.params.roomId;
    const exists = yield checkIfRecordExists(roomId);
    res.json({ exists });
}));
exports.default = router;
