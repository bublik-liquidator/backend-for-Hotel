import userService from '../service/userService';
import { UserDTO } from "../dto/user.dto";
import { UserRequest } from "../dto/userRequest.dto";
import pino from 'pino';
import pretty from 'pino-pretty';
const loggerr = pino( pretty() );

import express, { Express, NextFunction, Request, Response, Router } from 'express';
import { isAdmin, isUserOrAdminOrManager } from '../middleware/middleware';
const router: Router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
/**
 * @swagger
 * /user/:
 *   get:
 *     tags:
 *       - Users
 *     name: Get all users
 *     summary: Get all users with pagination
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
 *         description: A list of users
 *       '404':
 *         description: Users not found
 *       '500':
 *         description: Internal Server Error with get all
 */
router.get( "/", async ( req, res ) => {
  var page: number = parseInt( req.query.page as string ) || 1;
  var limit: number = parseInt( req.query.limit as string ) || 10;
  try {
    const result = await userService.getAll( page, limit );
    if ( !result ) {
      return res.status( 404 ).json( { error: 'user not found' } );
    }
    return res.status( 200 ).json( result );

  } catch ( err ) {
    loggerr.error( err );
    return res.status( 500 ).json( { error: 'user Server Error with get all' } );
  }

} );

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags:
 *       - Users
 *     name: Get user by ID
 *     summary: Get a single user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to get
 *     responses:
 *       '200':
 *         description: A single user
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error with get by id
 */
router.get( "/:id", async ( req, res ) => {
  try {
    const id = parseInt( req.params.id );
    const user = await userService.getById( id );
    if ( !user ) {
      return res.status( 404 ).json( { error: 'user not found' } );
    }
    return res.status( 200 ).json( user as unknown as UserDTO );
  } catch ( err ) {
    loggerr.error( err );
    return res.status( 500 ).json( { error: 'Internal Server Error with get by id' } );
  }
} );

/**
  * @swagger
  * /user/{id}:
  *   put:
  *     security:
  *       - BearerAuth: []
  *     tags:
  *       - Users
  *     name: Update user by ID
  *     summary: Update a single user by ID
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: integer
  *         required: true
  *         description: Numeric ID of the user to update
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               username:
  *                 type: string
  *               password:
  *                 type: string
  *               login:
  *                 type: string
  *               photo:
  *                 type: string
  *               birthday:
  *                 type: string
  *               phonenomber:
  *                 type: string
  *               email:
  *                 type: string
  *               many:
  *                 type: number
  *                 format: float
  *               role:
  *                 type: string
  *             required:
  *               - username
  *               - password
  *               - login
  *               - photo
  *               - birthday
  *               - phonenomber
  *               - email
  *               - many
  *               - role
  *     responses:
  *       '201':
  *         description: User updated successfully
  *       '404':
  *         description: User not found
  *       '500':
  *         description: Internal Server Error with put by id
  */


router.put("/:id", isUserOrAdminOrManager, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    console.log(req.body)
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }
    const result = await userService.put(req.body, id);
    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(201).json(result);
  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'Internal Server Error with put by id' });
  }
});

/**
 * @swagger
 * /user/change_password:
 *   put:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     name: Change user password
 *     summary: Change a user's password
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password of the user.
 *             required:
 *               - password
 *     responses:
 *       '201':
 *         description: Password changed successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error with put by id
 */

router.put( "/change_password", isAdmin, async ( req, res ) => {
  try {
    const id = parseInt( req.body.id );
    const [ affectedCount ] = await userService.change_password( req.body, id );
    if ( affectedCount > 0 ) {
      const updatedUser = await userService.getById( id );
      return res.status( 201 ).json( updatedUser );
    } else {
      return res.status( 404 ).json( { error: 'No rows updated' } );
    }
  } catch ( err ) {
    loggerr.error( err );
    return res.status( 500 ).json( { error: 'Internal Server Error with put by id' } );
  }
} );

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     security:
 *       - BearerAuth: [] 
 *     tags:
 *       - Users
 *     name: Delete user by ID
 *     summary: Delete a single user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to delete
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error with delete by id
 */
router.delete( "/:id", isAdmin, async ( req, res ) => {
  try {
    const id = parseInt( req.params.id );
    console.log( id )
    const user = await userService.getById( id );
    if ( !user ) {
      return res.status( 404 ).json( { error: 'user not found' } );
    }
    await userService.deleteById( parseInt( req.params.id ) )
    return res.status( 200 ).json( { message: 'user deleted successfully.' } );
  } catch ( err ) {
    loggerr.error( err );
    return res.status( 500 ).json( { error: 'Internal Server Error with delete by id' } );
  }

} );

export default router;

