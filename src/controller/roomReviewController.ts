import express, { Router } from 'express';
import { isAdminOrManager, isUserOrAdminOrManager } from "../middleware/middleware";
import roomReviewService from "../service/roomReviewService";
import { RoomReviewDTO } from "../dto/RoomReview.dto";
import pino from 'pino';
import pretty from 'pino-pretty';
const logger = pino(pretty());
const router: Router = express.Router();
/**
 * @swagger
 * /room_review/:
 *   post:
 *     tags:
 *       - Room Reviews
 *     name: Create a new room review
 *     summary: Create a new room review
 *     responses:
 *       '201':
 *         description: Review created successfully
 *       '500':
 *         description: Internal Server Error with post review
 */
router.post("/", isUserOrAdminOrManager, async (req, res) => {
  try {
    const review = await roomReviewService.create(req.body);
    return res.status(201).json(review);
  } catch (err) {
    logger.error(err);
    return res.status(500).json({ error: 'Internal Server Error with post review' });
  }
});
/**
 * @swagger
 * /room_review/:
 *   get:
 *     tags:
 *       - Room Reviews
 *     name: Get all room reviews
 *     summary: Get all room reviews with pagination
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
 *         description: A list of room reviews
 *       '404':
 *         description: Reviews not found
 *       '500':
 *         description: Server Error with get all reviews
 */
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
/**
 * @swagger
 * /room_review/{id}:
 *   get:
 *     tags:
 *       - Room Reviews
 *     name: Get room review by ID
 *     summary: Get a single room review by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the room review to get
 *     responses:
 *       '200':
 *         description: A single room review
 *       '404':
 *         description: Review not found
 *       '500':
 *         description: Internal Server Error with get review by id
 */
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

/**
 * @swagger
 * /room_review/{id}:
 *   delete:
 *     tags:
 *       - Room Reviews
 *     name: Delete room review by ID
 *     summary: Delete room review by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the room review to delete
 *     responses:
 *       '200':
 *         description: Review deleted successfully
 *       '404':
 *         description: Review not found
 *       '500':
 *         description: Internal Server Error with delete review by id
 */
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
