import { expect } from 'chai';
import sinon from 'sinon';
import roomBookingService from '../service/roomBookingService';
import roomBookingRepository from '../repository/roomBookingRepository';
import RoomBooking from '../models/RoomBooking';

describe('RoomBooking Service', () => {
  describe('create', () => {
    it('should create a new booking and return it', async () => {
      const mockBookingRequest = { 
        room_id: 1, 
        booked_by_user_id: 1, 
        date_from: '2022-01-01',
        date_to: '2022-01-02',
        payed: true,
        number: '123',
        name: 'Room 123'
      };
      const mockBooking = { id: 1, ...mockBookingRequest };

      const stub = sinon.stub(roomBookingRepository, 'post').returns(Promise.resolve<any>(mockBooking));
      const booking = await roomBookingService.post(mockBookingRequest);

      expect(booking).to.equal(mockBooking);
      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('getAll', () => {
    it('should return all bookings', async () => {
      const mockBookings = [
        { 
          id: 1, 
          room_id: 1, 
          booked_by_user_id: 1, 
          date_from: '2022-01-01',
          date_to: '2022-01-02',
          payed: true,
          number: '123',
          name: 'Room 123'
        },
        { 
          id: 2, 
          room_id: 2, 
          booked_by_user_id: 2, 
          date_from: '2022-02-01',
          date_to: '2022-02-02',
          payed: false,
          number: '456',
          name: 'Room 456'
        },
      ];

      const stub = sinon.stub(roomBookingRepository, 'getAll').returns(Promise.resolve<any[]>(mockBookings));
      const bookings = await roomBookingService.getAll(1, 10);

      expect(bookings).to.equal(mockBookings);
      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('getById', () => {
    it('should return the booking with the given id', async () => {
      const mockBooking = { 
        id: 1, 
        room_id: 1, 
        booked_by_user_id: 1, 
        date_from: '2022-01-01',
        date_to: '2022-01-02',
        payed: true,
        number: '123',
        name: 'Room 123'
      };

      const stub = sinon.stub(roomBookingRepository, 'getById').returns(Promise.resolve<any>(mockBooking));
      const booking = await roomBookingService.getById(1);

      expect(booking).to.equal(mockBooking);
      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('deleteById', () => {
    it('should delete the booking with the given id', async () => {
      const stub = sinon.stub(roomBookingRepository, 'deleteById').returns(Promise.resolve());

      await roomBookingService.deleteById(1);

      expect(stub.calledOnce).to.be.true;
    });
  });
});
