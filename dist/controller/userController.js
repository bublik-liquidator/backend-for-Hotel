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
const userService_1 = __importDefault(require("../service/userService"));
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const loggerr = (0, pino_1.default)((0, pino_pretty_1.default)());
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware/middleware");
const router = express_1.default.Router();
/**
 * @swagger
 * /user/:
 *   get:
 *     tags:
 *       - Users
 *     name: Get all users
 *     summary: Get all users with pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items to return
 *     responses:
 *       '200':
 *         description: A list of users
 *       '404':
 *         description: Users not found
 *       '500':
 *         description: Internal Server Error with get all
 */
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 10;
    try {
        const result = yield userService_1.default.getAll(page, limit);
        if (!result) {
            return res.status(404).json({ error: 'user not found' });
        }
        return res.status(200).json(result);
    }
    catch (err) {
        loggerr.error(err);
        return res.status(500).json({ error: 'user Server Error with get all' });
    }
}));
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags:
 *       - Users
 *     name: Get user by ID
 *     summary: Get a single user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to get
 *     responses:
 *       '200':
 *         description: A single user
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error with get by id
 */
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const user = yield userService_1.default.getById(id);
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }
        return res.status(200).json(user);
    }
    catch (err) {
        loggerr.error(err);
        return res.status(500).json({ error: 'Internal Server Error with get by id' });
    }
}));
/**
  * @swagger
  * /user/{id}:
  *   put:
  *     security:
  *       - BearerAuth: []
  *     tags:
  *       - Users
  *     name: Update user by ID
  *     summary: Update a single user by ID
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: integer
  *         required: true
  *         description: Numeric ID of the user to update
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               username:
  *                 type: string
  *               password:
  *                 type: string
  *               login:
  *                 type: string
  *               photo:
  *                 type: string
  *               birthday:
  *                 type: string
  *               phonenomber:
  *                 type: string
  *               email:
  *                 type: string
  *               many:
  *                 type: number
  *                 format: float
  *               role:
  *                 type: string
  *             required:
  *               - username
  *               - password
  *               - login
  *               - photo
  *               - birthday
  *               - phonenomber
  *               - email
  *               - many
  *               - role
  *     responses:
  *       '201':
  *         description: User updated successfully
  *       '404':
  *         description: User not found
  *       '500':
  *         description: Internal Server Error with put by id
  */
router.put("/:id", middleware_1.isUserOrAdminOrManager, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield userService_1.default.put(req.body, id);
        if (!result) {
            return res.status(404).json({ error: 'user not found' });
        }
        return res.status(201).json(result);
    }
    catch (err) {
        loggerr.error(err);
        return res.status(500).json({ error: 'Internal Server Error with put by id' });
    }
}));
/**
 * @swagger
 * /user/change_password:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     name: Change user password
 *     summary: Change a user's password
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password of the user.
 *             required:
 *               - password
 *     responses:
 *       '201':
 *         description: Password changed successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error with put by id
 */
router.put("/change_password", middleware_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.body.id);
        const [affectedCount] = yield userService_1.default.change_password(req.body, id);
        if (affectedCount > 0) {
            const updatedUser = yield userService_1.default.getById(id);
            return res.status(201).json(updatedUser);
        }
        else {
            return res.status(404).json({ error: 'No rows updated' });
        }
    }
    catch (err) {
        loggerr.error(err);
        return res.status(500).json({ error: 'Internal Server Error with put by id' });
    }
}));
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     name: Delete user by ID
 *     summary: Delete a single user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to delete
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error with delete by id
 */
router.delete("/:id", middleware_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        console.log(id);
        const user = yield userService_1.default.getById(id);
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }
        yield userService_1.default.deleteById(parseInt(req.params.id));
        return res.status(200).json({ message: 'user deleted successfully.' });
    }
    catch (err) {
        loggerr.error(err);
        return res.status(500).json({ error: 'Internal Server Error with delete by id' });
    }
}));
exports.default = router;
