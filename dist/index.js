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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const swager_1 = __importDefault(require("./config/swager"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const loggerr = (0, pino_1.default)((0, pino_pretty_1.default)());
const indexControler_1 = __importDefault(require("./controller/indexControler"));
const hotelController_1 = __importDefault(require("./controller/hotelController"));
const hotelRoomController_1 = __importDefault(require("./controller/hotelRoomController"));
const authController_1 = __importDefault(require("./controller/authController"));
const regController_1 = __importDefault(require("./controller/regController"));
const roomBookingController_1 = __importDefault(require("./controller/roomBookingController"));
const userController_1 = __importDefault(require("./controller/userController"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const roomReviewController_1 = __importDefault(require("./controller/roomReviewController"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
const port = process.env.INDEX_APP_PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
db_1.default.authenticate().then(() => __awaiter(void 0, void 0, void 0, function* () {
    app.use((0, morgan_1.default)("dev"));
    app.use("/api", indexControler_1.default);
    app.use("/api/user", userController_1.default);
    app.use("/api/hotel", hotelController_1.default);
    app.use("/api/hotel_room", hotelRoomController_1.default);
    app.use("/api/auth", authController_1.default);
    app.use("/api/register", regController_1.default);
    app.use("/api/room_booking", roomBookingController_1.default);
    app.use("/api/room_review", roomReviewController_1.default);
    (0, swager_1.default)(app);
    app.use((req, res, next) => {
        next((0, http_errors_1.default)(404));
    });
    app.listen(port);
    loggerr.info("Express server has started on port." + port);
})).catch((error) => console.log(error));
