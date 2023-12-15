import { Op } from 'sequelize';
import pino from 'pino';
import pretty from 'pino-pretty';
import HotelRoom from '../models/HotelRoom';
import { HotelRoomDTO } from '../dto/hotelRoom.dto';
import { HotelRoomRequest } from '../dto/hotelRoomRequest.dto';

const logger = pino(pretty());

async function getAll(page: number, size: number): Promise<any> {
  try {
    const result = await HotelRoom.findAll({
      offset: (page - 1) * size,
      limit: size,
      order: [['id', 'ASC']]
    });
    if (result.length > 0) {
      logger.info("Hotels exist.");
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
    const result = await HotelRoom.findByPk(id);
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

async function post(hotel: any) {
  try {
    const result = await HotelRoom.create(hotel);
    logger.info("Data has been saved!");
    return result;
  } catch (error) {
    logger.error(error);
    throw new Error("Repository post error");
  }
}

async function put(hotel: HotelRoomDTO, id: number) {
  try {
    const updateResult = await HotelRoom.update(hotel, {
      where: { id: id }
    });
    if (updateResult[0] > 0) { 
      const updatedHotel = await HotelRoom.findByPk(id); 
      logger.info("Hotel with ID:" + id + " updated successfully.");
      return updatedHotel; 
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
    await HotelRoom.destroy({
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
  deleteById
};
