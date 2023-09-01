import { HotelRoomDTO } from "../dto/hotelRoom.dto";
import { HotelRoomRequest } from "../dto/hotelRoomRequest.dto";
import hotelRoomRepository from "../repository/hotelRoomRepository";

async function getAll(page:number, limit:number) {  
  return await hotelRoomRepository.getAll(page, limit);
}

function getById(hotelRoomlId:number) { 
    return hotelRoomRepository.getById((hotelRoomlId));
  }
function post(hotelRoom: HotelRoomRequest) {
  return hotelRoomRepository.post(new HotelRoomRequest(hotelRoom));
}

async function put(hotelRoom: HotelRoomDTO, id:number) {
  return await hotelRoomRepository.put(hotelRoom, id);
}
function deleteById(hotelRoomlId:number) {
  return hotelRoomRepository.deleteById((hotelRoomlId));
}

export default {
    getAll,
    getById,
    post,
    put,
    deleteById,
  };