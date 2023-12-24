// middleware.js
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import userRepository   from '../repository/userRepository'; 
import pino from 'pino';

const logger = pino();

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const SECRET_KEY = process.env.SECRET_KEY;

    if (!authHeader) {
      const message = 'No authorization header';
      logger.error(message);
      return res.status(403).json({ error: message });
    }

    const token = authHeader.split(' ')[1]; 
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY!);
    } catch (err:any) {
      const message = 'Invalid token isAdmin: ' + err.message;
      logger.error(message);
      return res.status(401).json({ error: message });
    }

    let userId;
    if (typeof decodedToken === 'object' && 'id' in decodedToken) {
      userId = decodedToken.id;
      logger.info('userId from token: ' + userId);
    } else {
      const message = 'Invalid token structure';
      logger.error(message);
      return res.status(401).json({ error: message });
    }

    let user;
    try {
      user = await userRepository.getById(userId);
    } catch (err:any) {
      const message = 'Error fetching user: ' + err.message;
      logger.error(message);
      return res.status(500).json({ error: message });
    }

    if (!user||user.role !== 'admin') {
      const message = 'User is not an admin';
      logger.warn(message);
      return res.status(403).json({ error: message });
    }
  
    next();
  } catch (err) {
    const message = (err as Error).message;
    logger.error(message);
    return res.status(500).json({ error: 'Internal Server Error: ' + message });
  }
}



export async function isManager(req: Request, res: Response, next: NextFunction) {
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
      throw new Error('Invalid token isManager');
    }

    const user = await userRepository.getById(userId);
    if (!user||user.role !== 'manager') {
      logger.warn('User is not a manager');
      return res.status(403).json({ error: 'User is not a manager' });
    }
  
    next();
  } catch (err) {
    logger.error((err as Error).message);
    if ((err as Error).message === 'Invalid token isManager') {
      return res.status(401).json({ error: 'Invalid token isManager' });
    } else {
      return res.status(500).json({ error: 'Internal Server Error isManager' });
    }
  }
}


export async function isUser(req: Request, res: Response, next: NextFunction) {
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
      throw new Error('Invalid token isUser');
    }

    const user = await userRepository.getById(userId);;

    if (!user) {
      logger.warn('Middleware/User not found');
      return res.status(404).json({ error: 'Middleware/User not found' });
    }
  
    next();
  } catch (err) {
    logger.error((err as Error).message);
    if ((err as Error).message === 'Invalid token isUser') {
      return res.status(401).json({ error: 'Invalid token isUser' });
    } else {
      return res.status(500).json({ error: 'Internal Server Error isUser' });
    }
  }
}

export async function isAdminOrManager(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("это админ или манагер")
    const authHeader = req.headers.authorization;
    const SECRET_KEY = process.env.SECRET_KEY;

    if (!authHeader) {
      logger.error('No authorization header');
      return res.status(403).json({ error: 'No authorization header' });
    }

    const token = authHeader.split(' ')[1]; 
    console.log('Received token:', token); // Выводим полученный токен

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, SECRET_KEY!);
    } catch (err) {
      console.error('Error verifying token:', err); // Выводим ошибку при верификации токена
      throw err;
    }

    console.log('Decoded token:', decodedToken); // Выводим декодированный токен

    let userId;
    if (typeof decodedToken === 'object' && 'id' in decodedToken) {
      userId = decodedToken.id;
      logger.info('userId from token: ' + userId);
    } else {
      throw new Error('Invalid token isAdminOrManager');
    }

    const user = await userRepository.getById(userId);;

    if (!user||user.role !== 'admin' && user.role !== 'manager') {
      logger.warn('User is not an admin or a manager');
      return res.status(403).json({ error: 'User is not an admin or a manager' });
    }
    
    next();
  } catch (err) {
    logger.error((err as Error).message);
    if ((err as Error).message === 'Invalid token isAdminOrManager') {
      return res.status(401).json({ error: 'Invalid token isAdminOrManager' });
    } else {
      return res.status(500).json({ error: 'Internal Server Error isAdminOrManager' });
    }
  }
}



export async function isUserOrAdminOrManager(req: Request, res: Response, next: NextFunction) {
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
      throw new Error('Invalid token isUserOrAdminOrManager');
    }

    const user = await userRepository.getById(userId);;

    if (!user||user.role !== 'user' && user.role !== 'admin' && user.role !== 'manager') {
      logger.warn('User is not a user, admin or a manager');
      return res.status(403).json({ error: 'User is not a user, admin or a manager' });
    }
  
    next();
  } catch (err) {
    logger.error((err as Error).message);
    if ((err as Error).message === 'Invalid token') {
      return res.status(401).json({ error: 'Invalid token' });
    } else {
      return res.status(500).json({ error: 'Internal Server Error isUserOrAdminOrManager' });
    }
  }
}
