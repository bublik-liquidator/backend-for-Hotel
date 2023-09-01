import express, { Router } from 'express';
import passport from 'passport';
import { authService } from '../service/authService';

const router: Router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { login, password } = req.body;
    await authService.register(login, password);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;
    const token = await authService.login(login, password);
    res.json({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('Protected route');
});

export default router;