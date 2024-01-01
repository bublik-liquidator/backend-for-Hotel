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
const authService_1 = __importDefault(require("../service/authService"));
const router = express_1.default.Router();
/**
 * @swagger
 * /auth/:
 *   post:
 *     tags:
 *       - Auth
 *     name: Authenticate user
 *     summary: Authenticate a user using their login and password, and return a token upon successful authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 description: The login of the user.
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: "admin"
 *             required:
 *               - login
 *               - password
 *     responses:
 *       '200':
 *         description: Authentication was successful and a token is returned.
 *       '401':
 *         description: Authentication failed, no token returned.
 *       '500':
 *         description: An internal server error occurred during the authentication process.
 */
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received a request to authenticate a user.");
    try {
        console.log("Authenticating user with data:", req.body);
        const token = yield authService_1.default.authenticateUser(req.body);
        if (token) {
            console.log("Authentication successful, returning token.");
            return res.json({ token });
        }
        else {
            console.log("Authentication failed, no token returned.");
            return res.status(401).json({ error: "Invalid username or password" });
        }
    }
    catch (error) {
        console.log("An error occurred while authenticating user:", error);
        if (error instanceof Error) {
            return res.json({ error: error.message });
        }
        else {
            return res.json({ error: error.message });
        }
    }
}));
exports.default = router;
