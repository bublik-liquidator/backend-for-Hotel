import pino from 'pino';
import pretty from 'pino-pretty';
const loggerr = pino( pretty() );
import db from "../config/dbProvider"

import { RoomBookingRequest } from '../dto/roomBookingRequest.dto';
import { RoomBooking } from '../dto/roomBooking.dto';
import { HotelRoomDTO } from '../dto/hotelRoom.dto';
import { UserDTO } from '../dto/user.dto';


loggerr.info( process.env.POSTGRESQL_PORT );

async function getAll( page: number, size: number ): Promise<any> {
  try {
    const result = await db.pool.query( "SELECT * FROM room_booking ORDER BY id OFFSET $1 LIMIT $2", [ ( page - 1 ) * size, size ] );
    if ( result.rows.length > 0 ) {
      loggerr.info( "rooms exist." );
      return result.rows;
    }
    else {
      return 0
    }
  }
  catch ( err ) {
    loggerr.error( err );
    throw new Error( "Repository getAll error" );
  }
}


async function getById( id: number ) {
  try {
    const result = await db.pool.query( `SELECT * FROM room_booking WHERE id = ${ id }` );
    if ( result.rows.length > 0 ) {
      return result.rows[ 0 ];
    } else {
      return 0
    }
  } catch ( err ) {
    loggerr.error( err );
    throw new Error( "Repository getById error" );
  }
}
async function post( room: RoomBookingRequest ) {
  const query = "INSERT INTO room_booking(room_id, booked_by_user_id, date_from, date_to, payed, number, name) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *";
  const values = [ room.room_id, room.booked_by_user_id, room.date_from, room.date_to, room.payed, room.number, room.name ];
  try {
    const res = await db.pool.query( query, values );
    loggerr.info( "Data has been saved!" );
    return res.rows[ 0 ];
  } catch ( error ) {
    loggerr.error( error );
    throw new Error( "Repository post error" );
  }
};

async function postCheck( room: HotelRoomDTO ) {
  const res = await db.pool.query( `SELECT EXISTS(SELECT * FROM room_booking WHERE room_id = ${ room.id })` );
  return res.rows[ 0 ].exists;
}
async function postAccount( id: number) {
  const result = await db.pool.query( `SELECT * FROM room_booking WHERE booked_by_user_id = ${ id }` )
  return result.rows;
}


async function put( room: RoomBooking, id: number ) {
  const query = "UPDATE room_booking SET room_id = $1, booked_by_user_id = $2, date_from = $3, date_to = $4, payed = $5, number = $6, name = $7 WHERE id = $8 RETURNING *";
  const values = [ room.room_id, room.booked_by_user_id, room.date_from, room.date_to, room.payed, room.number, room.name ];
  try {
    const res = await db.pool.query( query, values );
    loggerr.info( "Room with ID:" + id + " updated successfully." );
    return res.rows[ 0 ];
  } catch ( error ) {
    loggerr.error( error );
    throw new Error( "Repository put error" );

  }
}

async function deleteById( id: number ) {
  try {
    await db.pool.query( `DELETE FROM room_booking WHERE id = ${ id }` );
  } catch ( err ) {
    loggerr.error( err );
    throw new Error( "Repository deleteById error" );
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
