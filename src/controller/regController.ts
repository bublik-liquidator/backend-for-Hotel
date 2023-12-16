import express from 'express';
import regService from '../service/regService';
import { isAdmin } from '../middleware/middleware';
const router = express.Router();
router.post("/",isAdmin, async (req, res) => {
    try {
      const user = await regService.register(req.body);
      if (user) {
        return res.json({ user });
      } else {
        return res.status(400).send();
      }
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: "Ошибка регистрации" });
    }
  });

  export default router;