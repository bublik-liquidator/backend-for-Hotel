
import * as userService from '../service/userService';
import { UserDTO } from "../dto/user.dto";
import { UserRequest } from "../dto/userRequest.dto";
import pino from 'pino';
import pretty from 'pino-pretty';
const loggerr = pino(pretty());

import express, { Express, NextFunction, Request, Response, Router } from 'express';
import { isAdmin } from '../middleware/middleware';
const router: Router = express.Router();




router.get("/", async (req, res) => {
  var page: number = parseInt(req.query.page as string) || 1;
  var limit: number = parseInt(req.query.limit as string) || 10;
  try {
    const result = await userService.getAll(page, limit);
    if (!result) {
      return res.status(404).json({ error: 'user not found' });
    }
    return res.status(200).json(result);

  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'user Server Error with get all' });
  }

});

router.get("/:id", isAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await userService.getById(id);
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    return res.status(200).json(user as unknown as UserDTO);
  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'Internal Server Error with get by id' });
  }
});


// router.post("/many", async (req, res) => {
//   let user = await userService.getByLogin(req.body.login) 
//   return res.json(new UserRequest(user));
// });

// router.post("/", async (req, res) => {
//   let user = await userService.post(req.body)
//   return res.json(user as UserRequest);
// });

router.put("/:id",isAdmin,  async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await userService.getById(id);
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    const result = await userService.put(req.body, parseInt(req.params.id));
    return res.status(201).json(result as unknown as UserDTO);
  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'Internal Server Error with put by id' });
  }
});

router.put("/change_password",isAdmin,  async (req, res) => {
  try {
    const id = parseInt(req.body.id);
    const user = await userService.getById(id);
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    const [affectedCount] = await userService.change_password(req.body, id);
    if (affectedCount > 0) {
      const updatedUser = await userService.getById(id);
      return res.status(201).json(updatedUser);
    } else {
      return res.status(404).json({ error: 'No rows updated' });
    }
  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'Internal Server Error with put by id' });
  }
});



router.delete("/:id",isAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(id)
    const user = await userService.getById(id);
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    await userService.deleteById(parseInt(req.params.id))
    return res.status(200).json({ message: 'user deleted successfully.' });
  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'Internal Server Error with delete by id' });
  }

});

export default router;
