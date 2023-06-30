import { RoomBooking } from "../dto/roomBooking.dto";
import hotelRoomRepository from "../repository/roomBookingRepository";
import { RoomBookingRequest } from "../dto/roomBookingRequest.dto";
import { HotelRoomDTO } from "../dto/hotelRoom.dto";
import { UserDTO } from "../dto/user.dto";

async function getAll(page:number, limit:number) {  
  return await hotelRoomRepository.getAll(page, limit);
}

function getById(hotelRoomlId:number) {
    return hotelRoomRepository.getById((hotelRoomlId));
  }
function post(hotelRoom: RoomBookingRequest) {
  return hotelRoomRepository.post(new RoomBookingRequest(hotelRoom));
}
function postCheck(hotelRoom: HotelRoomDTO) {
  return hotelRoomRepository.postCheck(new HotelRoomDTO(hotelRoom));
}
function postAccount(user: UserDTO) {
  return hotelRoomRepository.postAccount(new UserDTO(user));
}

async function put(hotelRoom: RoomBooking, id:number) {
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
    postCheck,
    postAccount
  };