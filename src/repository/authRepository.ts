import jwt from 'jsonwebtoken';
import pino from 'pino';
import pretty from 'pino-pretty';
import bcrypt from 'bcrypt';

import User from '../models/User';

const loggerr = pino(pretty());
const SECRET_KEY = process.env.SECRET_KEY;

async function authenticateUser(user: { login: string; password: string; }) {
  try {
    const foundUser = await User.findOne({ where: { login: user.login } });
    if (foundUser) {
      const passwordMatch = await bcrypt.compare(user.password, foundUser.password);
      if (passwordMatch) {
        const token = jwt.sign({ id: foundUser.id, role: foundUser.role }, SECRET_KEY!);
        loggerr.info("User authenticated!");
        return token;
      } else {
        loggerr.error("Invalid password!");
        throw new Error("Invalid credentials");
      }
    } else {
      loggerr.error("User not found!");
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    loggerr.error(error);
    throw new Error(error+"");
  }
};

export default { authenticateUser };
