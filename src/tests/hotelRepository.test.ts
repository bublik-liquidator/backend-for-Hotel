import { expect } from 'chai';
import sinon from 'sinon';
import hotelService from '../service/hotelService';
import hotelRepository from '../repository/hotelRepository';


describe('Hotel Service', () => {
  describe('getAll', () => {
    it('should return all hotels', async () => {
      const mockHotels = [
        { id: 1, name: 'Hotel1', manager_id: 1, path_picture: ['path1'], location: 'Location1', services: ['Service1'] },
        { id: 2, name: 'Hotel2', manager_id: 2, path_picture: ['path2'], location: 'Location2', services: ['Service2'] },
      ];

      const stub = sinon.stub(hotelRepository, 'getAll').returns(Promise.resolve(mockHotels));
      const hotels = await hotelService.getAll(1, 10);

      expect(hotels).to.equal(mockHotels);
      expect(stub.calledOnce).to.be.true;
    });
  });
  describe('getById', () => {
    it('should return the hotel with the given id', async () => {
const mockHotel = { id: 1, name: 'Hotel1', manager_id: 1, path_picture: ['path1'], location: 'Location1', services: ['Service1'] };
      const stub = sinon.stub(hotelRepository, 'getById').returns(Promise.resolve(mockHotel));
      const hotel = await hotelService.getById(1);

      expect(hotel).to.equal(mockHotel);
      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('post', () => {
    it('should create a new hotel and return it', async () => {
      const mockHotelRequest = { name: 'Hotel1', manager_id: 1, path_picture: ['path1'], location: 'Location1', services: ['Service1'] };
      const mockHotel = { id: 1, ...mockHotelRequest };

      const stub = sinon.stub(hotelRepository, 'post').returns(Promise.resolve(mockHotel));
      const hotel = await hotelService.post(mockHotelRequest);

      expect(hotel).to.equal(mockHotel);
      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('put', () => {
    it('should update the hotel with the given id and return it', async () => {
      const mockHotel = { id: 1, name: 'Hotel1', manager_id: 1, path_picture: ['path1'], location: 'Location1', services: ['Service1'] };

      const stub = sinon.stub(hotelRepository, 'put').returns(Promise.resolve(mockHotel));
      const hotel = await hotelService.put(mockHotel, 1);

      expect(hotel).to.equal(mockHotel);
      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('deleteById', () => {
    it('should delete the hotel with the given id', async () => {
      const stub = sinon.stub(hotelRepository, 'deleteById').returns(Promise.resolve());

      await hotelService.deleteById(1);

      expect(stub.calledOnce).to.be.true;
    });
  });
});
