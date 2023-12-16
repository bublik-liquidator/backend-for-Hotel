import { Op } from 'sequelize';
import pino from 'pino';
import pretty from 'pino-pretty';
import RoomReview from '../models/RoomReview';
import { RoomReviewDTO } from '../dto/RoomReview.dto';

const logger = pino(pretty());

async function create(review: RoomReviewDTO) {
    try {
      const reviewModel = {       
        author_id: review.author_id,
        room_id: review.room_id,
        review: review.review
      };
      const result = await RoomReview.create(reviewModel);
      logger.info("Review has been saved!");
      return result;
    } catch (error) {
      logger.error(error);
      throw new Error("Repository create review error");
    }
  }
  

async function getAll(page: number, size: number): Promise<any> {
  try {
    const result = await RoomReview.findAll({
      offset: (page - 1) * size,
      limit: size,
      order: [['id', 'ASC']]
    });
    if (result.length > 0) {
      logger.info("Reviews exist.");
      return result;
    } else {
      return [];
    }
  } catch (err) {
    logger.error(err);
    throw new Error("Repository getAll error");
  }
}

async function getById(id: number) {
  try {
    const result = await RoomReview.findByPk(id);
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (err) {
    logger.error(err);
    throw new Error("Repository getById error");
  }
}

async function deleteById(id: number) {
    try {
      await RoomReview.destroy({
        where: { id: id }
      });
      logger.info("Review with ID:" + id + " deleted successfully.");
    } catch (err) {
      logger.error(err);
      throw new Error("Repository deleteById error");
    }
  }

export default {
  create,
  getAll,
  getById,
  deleteById
};
