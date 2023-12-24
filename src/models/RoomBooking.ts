import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './User';
import HotelRoom from './HotelRoom';

interface RoomBookingInstance extends Model {
  id: number;
  room_id: number;
  booked_by_user_id: number;
  date_from: string;
  date_to: string;
  payed: boolean;
  number: string;
  name: string;
}

const RoomBooking = sequelize.define<RoomBookingInstance>('room_booking', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  room_id: {
    type: DataTypes.BIGINT,
    references: {
      model: HotelRoom,
      key: 'id'
    }
  },
  booked_by_user_id: {
    type: DataTypes.BIGINT,
    references: {
      model: User,
      key: 'id'
    }
  },
  date_from: DataTypes.STRING,
  date_to: DataTypes.STRING,
  payed: DataTypes.BOOLEAN,
  number: DataTypes.STRING,
  name: DataTypes.STRING
}, {
  tableName: 'room_booking', 

  timestamps: false
});

export default RoomBooking;
