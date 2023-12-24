import { expect } from 'chai';
import sinon from 'sinon';
import hotelRoomService from '../service/hotelRoomService';
import hotelRoomRepository from '../repository/hotelRoomRepository';
import HotelRoom from '../models/HotelRoom';

describe('HotelRoom Service', () => {
  describe('create', () => {
    it('should create a new hotel room and return it', async () => {
      const mockHotelRoomRequest = { 
        id:1,
        hotel_id: 1, 
        number: '101', 
        description: 'Cozy room',
        price: 100.00,
        path_picture: 'path/to/picture',
        name: 'Room 101'
      };
      const mockHotelRoom = {  ...mockHotelRoomRequest };

      const stub = sinon.stub(hotelRoomRepository, 'post').returns(Promise.resolve<any>(mockHotelRoom));
      const hotelRoom = await hotelRoomService.post(mockHotelRoomRequest);

      expect(hotelRoom).to.equal(mockHotelRoom);
      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('getAll', () => {
    it('should return all hotel rooms', async () => {
      const mockHotelRooms = [
        { 
          id: 1, 
          hotel_id: 1, 
          number: '101', 
          description: 'Cozy room',
          price: 100.00,
          path_picture: 'path/to/picture',
          name: 'Room 101'
        },
        { 
          id: 2, 
          hotel_id: 2, 
          number: '102', 
          description: 'Spacious room',
          price: 200.00,
          path_picture: 'path/to/picture',
          name: 'Room 102'
        },
      ];

      const stub = sinon.stub(hotelRoomRepository, 'getAll').returns(Promise.resolve<any[]>(mockHotelRooms));
      const hotelRooms = await hotelRoomService.getAll(1, 10);

      expect(hotelRooms).to.equal(mockHotelRooms);
      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('getById', () => {
    it('should return the hotel room with the given id', async () => {
      const mockHotelRoom = { 
        id: 1, 
        hotel_id: 1, 
        number: '101', 
        description: 'Cozy room',
        price: 100.00,
        path_picture: 'path/to/picture',
        name: 'Room 101'
      };

      const stub = sinon.stub(hotelRoomRepository, 'getById').returns(Promise.resolve<any>(mockHotelRoom));
      const hotelRoom = await hotelRoomService.getById(1);

      expect(hotelRoom).to.equal(mockHotelRoom);
      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('deleteById', () => {
    it('should delete the hotel room with the given id', async () => {
      const stub = sinon.stub(hotelRoomRepository, 'deleteById').returns(Promise.resolve());

      await hotelRoomService.deleteById(1);

      expect(stub.calledOnce).to.be.true;
    });
  });
});
