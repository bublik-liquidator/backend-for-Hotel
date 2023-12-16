import { RoomReviewDTO } from "../dto/RoomReview.dto";
import roomReviewRepository from "../repository/roomReviewRepository";

async function create(review: RoomReviewDTO) {
  return await roomReviewRepository.create(review);
}

async function getAll(page: number, size: number) {
  return await roomReviewRepository.getAll(page, size);
}

async function getById(id: number) {
  return await roomReviewRepository.getById(id);
}

async function deleteById(id: number) {
  return await roomReviewRepository.deleteById(id);
}

export default {
  create,
  getAll,
  getById,
  deleteById
};
