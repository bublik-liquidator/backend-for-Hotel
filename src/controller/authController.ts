import express from 'express';
import authService from '../service/authService';
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const token = await authService.authenticateUser(req.body);
    if (token) {
      return res.json({ token });
    } else {
      return res.status(401).json({ error: "Error, no token"});
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});



export default router;