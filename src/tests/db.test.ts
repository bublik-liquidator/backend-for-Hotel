import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

describe('Database Connection', () => {
  it('should connect to the database', async () => {
    const pool = new Pool({
      user: process.env.POSTGRESQL_USER,
      host: process.env.POSTGRESQL_HOST,
      database: process.env.POSTGRESQL_DB_NAME,
      password: process.env.POSTGRESQL_PASSWORD,
      port: Number(process.env.POSTGRESQL_PORT),  
    });

    let client;
    try {
      client = await pool.connect();
      expect(client).toBeTruthy();
    } catch (error) {
      throw error;
    } finally {
      client?.release();
      await pool.end();
    }
  });
});
