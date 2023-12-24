import jwt from 'jsonwebtoken';
import pino from 'pino';
import pretty from 'pino-pretty';
import bcrypt from 'bcrypt';

import User from '../models/User';

const logger = pino(pretty());
const SECRET_KEY = process.env.SECRET_KEY;

async function authenticateUser(user: { login: string; password: string; }) {
  try {
    const foundUser = await User.findOne({ where: { login: user.login } });
    if (!foundUser) {
      logger.error("User not found!");
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(user.password, foundUser.password);
    if (!passwordMatch) {
      logger.error("Invalid password!");
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: foundUser.id, role: foundUser.role }, SECRET_KEY!);
    logger.info("User authenticated!");

    return token;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export default { authenticateUser };
