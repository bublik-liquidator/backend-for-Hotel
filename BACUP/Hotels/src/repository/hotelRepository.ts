import pino from 'pino';
import pretty from 'pino-pretty';
const loggerr = pino(pretty());
import db from "../config/dbProvider"

import { HotelDTO } from '../dto/hotel.dto';
import { HotelRequest } from '../dto/hotelRequest.dto';


loggerr.info(process.env.POSTGRESQL_PORT);

async function getAll(page: number, size: number): Promise<any> {
  try {
    const result = await db.pool.query("SELECT * FROM hotel ORDER BY id OFFSET $1 LIMIT $2", [(page - 1) * size, size]);
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
    const result = await db.pool.query(`SELECT * FROM hotel WHERE id = ${id}`);
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
async function post(hotel: HotelRequest) {
  const query = "INSERT INTO hotel(name, manager_id,path_picture) VALUES($1, $2, $3) RETURNING *";
  const values = [hotel.name, hotel.manager_id, hotel.path_picture];
  try {
    const res = await db.pool.query(query, values);
    loggerr.info("Data has been saved!");
    return res.rows[0];
  } catch (error) {
    loggerr.error(error);
    throw new Error("Repository post error");
  }
};


async function put(hotel: HotelDTO, id: number) {
  const query = "UPDATE hotel SET name = $1, manager_id = $2, path_picture = $3 WHERE id = $4 RETURNING *";
  const values = [hotel.name, hotel.manager_id, hotel.path_picture, id];
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
    await db.pool.query(`DELETE FROM hotel WHERE id = ${id}`);
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
