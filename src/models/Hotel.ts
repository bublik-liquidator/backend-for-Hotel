import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './User';

interface HotelInstance extends Model {
  id: number;
  name: string;
  manager_id: number;
  path_picture: string[];
  location: string; 
  services: string[]; 
}

const Hotel = sequelize.define<HotelInstance>('hotel', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING(255),
  manager_id: {
    type: DataTypes.BIGINT,
    references: {
      model: User,
      key: 'id'
    }
  },
  path_picture: DataTypes.ARRAY(DataTypes.STRING), 
  location: DataTypes.STRING(255), 
  services: DataTypes.ARRAY(DataTypes.STRING), 
}, {
  tableName: 'hotel', 
  timestamps: false
});

export default Hotel;
