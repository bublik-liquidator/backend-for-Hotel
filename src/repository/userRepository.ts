import pino from 'pino';
import pretty from 'pino-pretty';
const loggerr = pino( pretty() );
import db from "../config/dbProvider"
import bcrypt from 'bcrypt';

import { UserDTO } from '../dto/user.dto';
import { UserRequest } from '../dto/userRequest.dto';


async function getAll( page: number, size: number ): Promise<any> {
  try {
    const result = await db.pool.query( "SELECT * FROM users ORDER BY id OFFSET $1 LIMIT $2", [ ( page - 1 ) * size, size ] );
    if ( result.rows.length > 0 ) {
      loggerr.info( "user exist." );
      return result.rows;
    }
    else {
      loggerr.info( "I didn't find it." );
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
    const result = await db.pool.query( `SELECT * FROM users WHERE id = ${ id }` );
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


async function post( user: UserRequest ) {
  const query = "INSERT INTO users(username, photo, phonenomber, password, many, email, birthday, login,role) VALUES($1, $2, $3, $4, $5, $6, $7, $8,$9) RETURNING *";
  const values = [ user.username, user.photo, user.phonenomber, user.password, user.many, user.email, user.birthday, user.login, user.role ];
  try {
    const res = await db.pool.query( query, values );
    loggerr.info( "Data has been saved!" );
    return res.rows[ 0 ];
  } catch ( error ) {
    loggerr.error( error );
    throw new Error( "Repository post error" );
  }
};


async function put( user: UserDTO, id: number ) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash( user.password, saltRounds );

  const query = "UPDATE users SET username = $1, photo = $2, phonenomber = $3, many = $4, email = $5, birthday = $6,role = $7 WHERE id = $8 RETURNING *";
  const values = [ user.username, user.photo, user.phonenomber, user.many, user.email, user.birthday,user.role, id ];

  try {
    const res = await db.pool.query( query, values );
    loggerr.info( "user with ID:" + id + " updated successfully." );
    return res.rows[ 0 ];
  } catch ( error ) {
    loggerr.error( error );
    throw new Error( "Repository put error" );
  }
}

async function change_password( user: UserDTO, id: number ) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash( user.password, saltRounds );

  const query = "UPDATE users SET username = $1, login=$2, password = $3 WHERE id = $4 RETURNING *";
  const values = [ user.username, user.login, hashedPassword, id ];

  try {
    const res = await db.pool.query( query, values );
    loggerr.info( "user with ID:" + id + " updated successfully." );
    return res.rows[ 0 ];
  } catch ( error ) {
    loggerr.error( error );
    throw new Error( "Repository put error" );
  }
}


async function deleteById( id: number ) {
  try {
    await db.pool.query( `DELETE FROM users WHERE id = ${ id }` );
  } catch ( err ) {
    loggerr.error( err );
    throw new Error( "Repository deleteById error" );
  }
}

export {
  getAll,
  getById,
  post,
  put,
  deleteById,
  change_password
};
