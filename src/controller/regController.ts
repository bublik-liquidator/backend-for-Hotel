import express from 'express';
import regService from '../service/regService';
import { isAdmin } from '../middleware/middleware';
const router = express.Router();
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