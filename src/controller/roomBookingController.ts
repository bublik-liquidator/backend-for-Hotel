

import hotelRoomService from "../service/roomBookingService"
import { RoomBooking } from "../dto/roomBooking.dto";
import { RoomBookingRequest } from "../dto/roomBookingRequest.dto";

import pino from 'pino';
import pretty from 'pino-pretty';
const loggerr = pino( pretty() );

import express, { Router } from 'express';
import { isUserOrAdminOrManager } from "../middleware/middleware";
const router: Router = express.Router();

/**
 * @swagger
 * /room_booking/:
 *   get:
 *     tags:
 *       - Rooms
 *     name: Get all rooms
 *     summary: Get all rooms with pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items to return
 *     responses:
 *       '200':
 *         description: A list of rooms
 *       '404':
 *         description: Rooms not found
 *       '500':
 *         description: Room Server Error with get all
 */
router.get( "/", async ( req, res ) => {
  var page: number = parseInt( req.query.page as string ) || 1;
  var limit: number = parseInt( req.query.limit as string ) || 10;
  try {
    const result = await hotelRoomService.getAll( page, limit );
    if ( !result ) {
      return res.status( 404 ).json( { message: 'Room not found' } );
    }
    return res.status( 200 ).json( result );

  } catch ( err ) {
    loggerr.error( err );
    return res.status( 500 ).json( { error: 'Room Server Error with get all' } );
  }

} );

/**
 * @swagger
 * /room_booking/{id}:
 *   get:
 *     tags:
 *       - Rooms
 *     name: Get room by ID
 *     summary: Get a single room by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the room to get
 *     responses:
 *       '200':
 *         description: A single room
 *       '404':
 *         description: Room not found
 *       '500':
 *         description: Internal Server Error with get by id
 */
router.get( "/:id", async ( req, res ) => {
  try {
    const id = parseInt( req.params.id );
    const hotelRoom = await hotelRoomService.getById( id );
    if ( !hotelRoom ) {
      return res.status( 404 ).json( { error: 'Hotel not found' } );
    }
    return res.status( 200 ).json( new RoomBooking( hotelRoom ) );
  } catch ( err ) {
    loggerr.error( err );
    return res.status( 500 ).json( { error: 'Internal Server Error with get by id' } );
  }

} );
/**
 * @swagger
 * /room_booking/:
 *   post:
 *     tags:
 *       - Rooms
 *     name: Create a new room
 *     summary: Create a new room
 *     responses:
 *       '200':
 *         description: Room created successfully
 *       '500':
 *         description: Internal Server Error with post
 */
router.post( "/", isUserOrAdminOrManager, async ( req, res ) => {
  let hotelRoom = await hotelRoomService.post( req.body )
  return res.json( new RoomBookingRequest( hotelRoom ) );
} );
/**
 * @swagger
 * /room_booking/check:
 *   post:
 *     tags:
 *       - Rooms
 *     name: Check room availability
 *     summary: Check room availability
 *     responses:
 *       '200':
 *         description: Room availability status
 *       '500':
 *         description: Internal Server Error with check
 */
router.post( "/check", async ( req, res ) => {
  let hotelRoom = await hotelRoomService.postCheck( req.body )
  return res.json( ( hotelRoom ) );
} );
/**
* @swagger
* /room_booking/account/{id}:
*   get:
*     tags:
*       - Rooms
*     name: Get account by ID
*     summary: Get account by ID
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: Numeric ID of the account to get
*     responses:
*       '200':
*         description: Account details
*       '400':
*         description: Invalid id
*       '500':
*         description: Internal Server Error with get by id
*/
router.get( "/account/:id", async ( req, res ) => {
  const id = Number( req.params.id );
  if ( isNaN( id ) ) {
    return res.status( 400 ).json( { error: 'Invalid id' } );
  }
  const account = await hotelRoomService.getAccount( id );
  return res.json( account );
} );


/**
 * @swagger
 * /room_booking/{id}:
 *   put:
 *     tags:
 *       - Rooms
 *     name: Update room by ID
 *     summary: Update room by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the room to update
 *     responses:
 *       '201':
 *         description: Room updated successfully
 *       '404':
 *         description: Room not found
 *       '500':
 *         description: Internal Server Error with put by id
 */
router.put( "/:id", isUserOrAdminOrManager, async ( req, res ) => {
  try {
    const id = parseInt( req.params.id );
    const hotelRoom = await hotelRoomService.getById( id );
    if ( !hotelRoom ) {
      return res.status( 404 ).json( { error: 'hotelRoom not found' } );
    }
    const result = await hotelRoomService.put( req.body, parseInt( req.params.id ) );
    return res.status( 201 ).json( new RoomBooking( result ) );
  } catch ( err ) {
    loggerr.error( err );
    return res.status( 500 ).json( { error: 'Internal Server Error with put by id' } );
  }
} );
/**
 * @swagger
 * /room_booking/{id}:
 *   delete:
 *     tags:
 *       - Rooms
 *     name: Delete room by ID
 *     summary: Delete room by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the room to delete
 *     responses:
 *       '200':
 *         description: Room deleted successfully
 *       '404':
 *         description: Room not found
 *       '500':
 *         description: Internal Server Error with delete by id
 */
router.delete( "/:id", isUserOrAdminOrManager, async ( req, res ) => {
  try {
    const id = parseInt( req.params.id );
    const hotelRoom = await hotelRoomService.getById( id );
    if ( !hotelRoom ) {
      return res.status( 404 ).json( { error: 'hotelRoom not found' } );
    }
    await hotelRoomService.deleteById( parseInt( req.params.id ) )
    return res.status( 200 ).json( { message: 'hotelRoom deleted successfully.' } );
  } catch ( err ) {
    loggerr.error( err );
    return res.status( 500 ).json( { error: 'Internal Server Error with delete by id' } );
  }

} );


export default router;
