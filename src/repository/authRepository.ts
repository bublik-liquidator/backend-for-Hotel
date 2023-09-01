import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Q156ap',
    database: 'postgres'
});

export const userRepository = {
    async findUserByEmail(login: string) {
      const result = await pool.query('SELECT * FROM users WHERE login = $1', [login]);
      return result.rows[0];
    },
  
    async createUser(login: string, password: string) {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(login+"login")
      await pool.query('INSERT INTO users (login, password) VALUES ($1, $2)', [login, hashedPassword]);
    }
  };