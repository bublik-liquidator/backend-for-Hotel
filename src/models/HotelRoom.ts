import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import Hotel from './Hotel';

interface HotelRoomInstance extends Model {
  id: number;
  hotel_id: number;
  number: string;
  description: string;
  price: number;
  path_picture: string;
  name: string;
}

const HotelRoom = sequelize.define<HotelRoomInstance>('hotel_room', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  hotel_id: {
    type: DataTypes.BIGINT,
    references: {
      model: Hotel,
      key: 'id'
    }
  },
  number: DataTypes.STRING(255),
  description: DataTypes.TEXT,
  price: DataTypes.DECIMAL(8, 2),
  path_picture: DataTypes.STRING(255),
  name: DataTypes.STRING(255)
}, {
  timestamps: false
});

export default HotelRoom;
