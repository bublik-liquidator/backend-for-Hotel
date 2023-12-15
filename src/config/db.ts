import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();
const sequelize = new Sequelize(
    process.env.POSTGRESQL_DB_NAME!,
    process.env.POSTGRESQL_USER!,
    process.env.POSTGRESQL_PASSWORD,
    {
      host: process.env.POSTGRESQL_HOST,
      port: Number(process.env.POSTGRESQL_PORT),
      dialect: 'postgres',
      logging: false 
    }
  );
export default sequelize;
