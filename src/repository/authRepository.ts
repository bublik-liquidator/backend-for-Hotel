import jwt from 'jsonwebtoken';
import db from "../config/dbProvider"
import pino from 'pino';
import pretty from 'pino-pretty';
import bcrypt from 'bcrypt';

const loggerr = pino(pretty());
const SECRET_KEY = process.env.SECRET_KEY;

async function authenticateUser(user: { login: string; password: string; }) {
  const query = "SELECT * FROM users WHERE login = $1";
  const values = [user.login];

  try {
    const res = await db.pool.query(query, values);
    if (res.rows.length > 0) {
      const passwordMatch = await bcrypt.compare(user.password, res.rows[0].password);
      if (passwordMatch) {
        const token = jwt.sign({ id: res.rows[0].id, role: res.rows[0].role }, process.env.SECRET_KEY!);
        loggerr.info("User authenticated!");
        return token;
      } else {
        loggerr.error("Invalid password!");
        throw new Error("Invalid password");
      }
    } else {
      loggerr.error("User not found!");
      throw new Error("User not found");
    }
  } catch (error) {
    loggerr.error(error);
    throw new Error("Repository authentication error");
  }
};

export default {authenticateUser};
