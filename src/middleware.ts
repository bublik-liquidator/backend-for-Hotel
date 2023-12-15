// middleware.js
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { getById } from './repository/userRepository'; // Импортируйте вашу функцию getById
import pino from 'pino';

const logger = pino();

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const SECRET_KEY = process.env.SECRET_KEY;

    if (!authHeader) {
      logger.error('No authorization header');
      return res.status(403).json({ error: 'No authorization header' });
    }

    const token = authHeader.split(' ')[1]; 
    const decodedToken = jwt.verify(token, SECRET_KEY!);

    let userId;
    if (typeof decodedToken === 'object' && 'id' in decodedToken) {
      userId = decodedToken.id;
      logger.info('userId from token: ' + userId);
    } else {

      throw new Error('Invalid token');
    }

    const user = await getById(userId);
    // logger.info("user.role: "+user.role)

    if (user.role !== 'admin') {
      logger.warn('User is not an admin');
      return res.status(403).json({ error: 'User is not an admin' });
    }
  
    next();
  } catch (err) {
    logger.error((err as Error).message);
    if ((err as Error).message === 'Invalid token') {
      return res.status(401).json({ error: 'Invalid token' });
    } else {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
}
