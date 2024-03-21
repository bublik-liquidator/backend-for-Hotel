import express from 'express';
import regService from '../service/regService';
import { isAdmin } from '../middleware/middleware';
const router = express.Router();
/**
 * @swagger
 * /register/admin:
 *   post:
 *     tags:
 *       - Registration
 *     name: Register a new admin
 *     summary: Register a new admin
 *     responses:
 *       '200':
 *         description: Admin registered successfully
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Registration error
 */
router.post( "/admin", isAdmin, async ( req, res ) => {
  try {
    const user = await regService.registerAdmin( req.body );
    if ( user ) {
      return res.json( { user } );
    } else {
      return res.status( 400 ).send();
    }
  } catch ( error ) {
    console.log( error )
    return res.status( 500 ).send( { error: "Registration error" } );
  }
} );
/**
 * @swagger
 * /register/:
 *   post:
 *     tags:
 *       - Registration
 *     name: Register a new user
 *     summary: Register a new user
 *     responses:
 *       '200':
 *         description: User registered successfully
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Registration error
 */
router.post( "/", async ( req, res ) => {
  try {
    const user = await regService.registerUser( req.body );
    if ( user ) {
      return res.json( { user } );
    } else {
      return res.status( 400 ).send();
    }
  } catch ( error ) {
    if ( error instanceof Error ) {
      return res.status( 500 ).send( { error: error.message } );
    }
  }
} );


export default router;