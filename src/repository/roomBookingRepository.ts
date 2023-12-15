import { Op } from 'sequelize';
import pino from 'pino';
import pretty from 'pino-pretty';
import RoomBooking from '../models/RoomBooking';
import HotelRoom from '../models/HotelRoom';
import { HotelRoomDTO } from '../dto/hotelRoom.dto';
import { RoomBookingRequest } from '../dto/roomBookingRequest.dto';

const logger = pino(pretty());

async function getAll(page: number, size: number): Promise<any> {
  try {
    const result = await RoomBooking.findAll({
      offset: (page - 1) * size,
      limit: size,
      order: [['id', 'ASC']]
    });
    if (result.length > 0) {
      logger.info("Rooms exist.");
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
    const result = await RoomBooking.findByPk(id);
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

async function post(room: any) {
  try {
    const result = await RoomBooking.create(room);
    logger.info("Data has been saved!");
    return result;
  } catch (error) {
    logger.error(error);
    throw new Error("Repository post error");
  }
}

async function postCheck(room: HotelRoomDTO) {
  const result = await RoomBooking.findOne({ where: { room_id: room.id } });
  return !!result;
}

async function postAccount(id: number) {
  const result = await RoomBooking.findAll({ where: { booked_by_user_id: id } });
  return result;
}

async function put(room: RoomBookingRequest, id: number) {
  try {
    const [affectedCount, affectedRows] = await RoomBooking.update(room, {
      where: { id: id },
      returning: true 
    });
    if (affectedCount > 0) {
      logger.info("Room with ID:" + id + " updated successfully.");
      return affectedRows[0]; 
    } else {
      throw new Error("No rows were updated");
    }
  } catch (error) {
    logger.error(error);
    throw new Error("Repository put error");
  }
}


async function deleteById(id: number) {
  try {
    await RoomBooking.destroy({
      where: { id: id }
    });
  } catch (err) {
    logger.error(err);
    throw new Error("Repository deleteById error");
  }
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
