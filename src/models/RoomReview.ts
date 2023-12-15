import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './User';
import HotelRoom from './HotelRoom';

interface RoomReviewInstance extends Model {
  id: number;
  author_id: number;
  room_id: number;
  review: string;
}

const RoomReview = sequelize.define<RoomReviewInstance>('room_review', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  author_id: {
    type: DataTypes.BIGINT,
    references: {
      model: User,
      key: 'id'
    }
  },
  room_id: {
    type: DataTypes.BIGINT,
    references: {
      model: HotelRoom,
      key: 'id'
    }
  },
  review: DataTypes.TEXT
}, {
  timestamps: false
});

export default RoomReview;
