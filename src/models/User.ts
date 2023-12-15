import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import pino from 'pino';
import pretty from 'pino-pretty';


interface UserInstance extends Model {
  id: number;
  username: string;
  password: string;
  login: string;
  photo: string;
  birthday: string;
  phonenomber: string;
  email: string;
  many: number;
  role: string;
}

const User = sequelize.define<UserInstance>('users', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  username: DataTypes.STRING(255),
  password: DataTypes.STRING(255),
  login: DataTypes.STRING(255),
  photo: DataTypes.STRING,
  birthday: DataTypes.STRING(15),
  phonenomber: DataTypes.STRING(16),
  email: DataTypes.STRING(23),
  many: DataTypes.DECIMAL(8, 3),
  role: DataTypes.STRING(10)
}, {
  timestamps: false
});

export default User;
