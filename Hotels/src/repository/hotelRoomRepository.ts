import pino from 'pino';
import pretty from 'pino-pretty';
const loggerr = pino(pretty());
import db from "../config/dbProvider"

import { HotelRoomDTO } from '../dto/hotelRoom.dto';
import { HotelRoomRequest } from '../dto/hotelRoomRequest.dto';


loggerr.info(process.env.POSTGRESQL_PORT);

async function getAll(page: number, size: number): Promise<any> {
  try {
    const result = await db.pool.query("SELECT * FROM hotel_room ORDER BY id OFFSET $1 LIMIT $2", [(page - 1) * size, size]);
    if (result.rows.length > 0) {
      loggerr.info("hotels exist.");
      return result.rows;
    }
    else {
      return 0
    }
  }
  catch (err) {
    loggerr.error(err);
    throw new Error("Repository getAll error");
  }
}


async function getById(id: number) {
  try {
    const result = await db.pool.query(`SELECT * FROM hotel_room WHERE id = ${id}`);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return 0
    }
  } catch (err) {
    loggerr.error(err);
    throw new Error("Repository getById error");
  }
}
async function post(hotel: HotelRoomRequest) {
  const query = "INSERT INTO hotel_room(name,path_picture,hotel_id, number, description, price) VALUES($1, $2, $3, $4,$5,$6) RETURNING *";
  const values = [hotel.name,hotel.path_picture,hotel.hotel_id, hotel.number, hotel.description, hotel.price];
  try {
    const res = await db.pool.query(query, values);
    loggerr.info("Data has been saved!");
    return res.rows[0];
  } catch (error) {
    loggerr.error(error);
    throw new Error("Repository post error");
  }
};


async function put(hotel: HotelRoomDTO, id: number) {
  const query = "UPDATE hotel_room SET hotel_id = $1, number = $2, description = $3, price = $4, name = $5, path_picture=$6 WHERE id = $7 RETURNING *";
  const values = [hotel.hotel_id, hotel.number, hotel.description, hotel.price,hotel.name,hotel.path_picture, id];
  try {
    const res = await db.pool.query(query, values);
    loggerr.info("Hotel with ID:" + id + " updated successfully.");
    return res.rows[0];
  } catch (error) {
    loggerr.error(error);
    throw new Error("Repository put error");

  }
}

async function deleteById(id: number) {
  try {
    await db.pool.query(`DELETE FROM hotel_room WHERE id = ${id}`);
  } catch (err) {
    loggerr.error(err);
    throw new Error("Repository deleteById error");
  }
}

export default {
  getAll,
  getById,
  post,
  put,
  deleteById,
};
