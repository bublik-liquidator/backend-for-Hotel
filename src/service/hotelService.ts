import { HotelRequest } from "../dto/hotelRequest.dto";
import { HotelDTO } from "../dto/hotel.dto";
import hotelRepository from "../repository/hotelRepository";

async function getAll(page: number, limit: number) {
  return await hotelRepository.getAll(page, limit);
}

async function getById(meetupId: number) {
  return await hotelRepository.getById(meetupId);
}

async function post(request: HotelRequest) { 
  return await hotelRepository.post(new HotelRequest(request));
}

async function put(newmeetup: HotelDTO, id: number) {
  return await hotelRepository.put(newmeetup, id);
}

function deleteById(meetupId: number) {
  return hotelRepository.deleteById(meetupId);
}

export default {
  getAll,
  getById,
  post,
  put,
  deleteById,
};