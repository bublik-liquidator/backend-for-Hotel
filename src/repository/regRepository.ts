import db from "../config/dbProvider"
import pino from 'pino';
import pretty from 'pino-pretty';
import bcrypt from 'bcrypt';

const loggerr = pino(pretty());

async function registerUser(user: { login: string; password: string; }) {
    const query = "INSERT INTO users (login, password) VALUES ($1, $2)";
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const values = [user.login, hashedPassword];
  
    try {
      const res = await db.pool.query(query, values);
      if (res.rowCount > 0) {
        loggerr.info("User registered!");
        return user;
      } else {
        loggerr.error("Registration failed!");
        throw new Error("Registration failed");
      }
    } catch (error) {
      loggerr.error(error);
      throw new Error("Repository registration error");
    }
  };
  
  export default { registerUser};