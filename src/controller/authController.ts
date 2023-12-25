import express from 'express';
import authService from '../service/authService';
const router = express.Router();
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

router.post("/", async (req, res) => {
  console.log("Received a request to authenticate a user.");
  try {
    console.log("Authenticating user with data:", req.body);
    const token = await authService.authenticateUser(req.body);
    if (token) {
      console.log("Authentication successful, returning token.");
      return res.json({ token });
    } else {
      console.log("Error, no token returned.");
      return res.status(401).json({ error: "Error, no token"});
    }
  } catch (error) {
    console.log("An error occurred while authenticating user:", error);
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

export default router;