import { Op } from 'sequelize';
import pino from 'pino';
import pretty from 'pino-pretty';
import Hotel from '../models/Hotel';
import { HotelRequest } from '../dto/hotelRequest.dto';
import { HotelDTO } from '../dto/hotel.dto';

const logger = pino(pretty());

async function getAll(page: number, size: number): Promise<any> {
  try {
    const result = await Hotel.findAll({
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

async function getById(id: number): Promise<any> {
  try {
    const result = await Hotel.findByPk(id);
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

async function post(hotel: any): Promise<any> {
  try {
    console.log('Received hotel:', hotel); 
    const result = await Hotel.create(hotel);
    logger.info("Data has been saved!");
    return result;
  } catch (error) {
    console.error('Error details:', error); 
    logger.error(error);
    throw new Error("Repository post error");
  }
}


async function put(hotel: HotelDTO, id: number): Promise<any> {
  try {
    const [affectedCount, affectedRows] = await Hotel.update(hotel, {
      where: { id: id },
      returning: true 
    });
    if (affectedCount > 0) {
      logger.info("Hotel with ID:" + id + " updated successfully.");
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
    await Hotel.destroy({
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
