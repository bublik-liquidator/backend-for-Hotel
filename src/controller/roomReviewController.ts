import express, { Router } from 'express';
import { isAdminOrManager, isUserOrAdminOrManager } from "../middleware/middleware";
import roomReviewService from "../service/roomReviewService";
import { RoomReviewDTO } from "../dto/RoomReview.dto";
import pino from 'pino';
import pretty from 'pino-pretty';
const logger = pino(pretty());
const router: Router = express.Router();

router.post("/", isUserOrAdminOrManager, async (req, res) => {
  try {
    const review = await roomReviewService.create(req.body);
    return res.status(201).json(review);
  } catch (err) {
    logger.error(err);
    return res.status(500).json({ error: 'Internal Server Error with post review' });
  }
});

router.get("/", async (req, res) => {
  var page: number = parseInt(req.query.page as string) || 1;
  var limit: number = parseInt(req.query.limit as string) || 10;  
  try {    
    const result = await roomReviewService.getAll(page, limit);
    if (!result) {
      return res.status(404).json({ error: 'Reviews not found' });
    }
    return res.status(200).json(result);
  } catch (err) {
    logger.error(err);
    return res.status(500).json({ error: 'Server Error with get all reviews' });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const review = await roomReviewService.getById(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    return res.status(200).json(new RoomReviewDTO(review));
  } catch (err) {
    logger.error(err);
    return res.status(500).json({ error: 'Internal Server Error with get review by id' });
  }
});

router.delete("/:id", isAdminOrManager, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const review = await roomReviewService.getById(id);
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
      await roomReviewService.deleteById(id);
      return res.status(200).json({ message: 'Review deleted successfully.' });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ error: 'Internal Server Error with delete review by id' });
    }
  });

export default router;
