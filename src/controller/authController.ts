import express from 'express';
import authService from '../service/authService';
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const token = await authService.login(req.body);
    if (token) {
      return res.json({ token });
    } else {
      return res.status(401).send({ error: "Ошибка, нет токена"});
    }
  } catch (error) {
    return res.status(500).send({ error});
  }
});



export default router;