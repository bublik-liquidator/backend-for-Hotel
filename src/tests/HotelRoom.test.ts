import HotelRoom from "../models/HotelRoom";

describe('HotelRoom Model', () => {
    it('should call HotelRoom.create when creating a hotel room', async () => {
      const createMock = jest.spyOn(HotelRoom, 'create').mockImplementation();

      await HotelRoom.create({
        hotel_id: 1,
        number: '101',
        description: 'Cozy room with sea view',
        price: 100.00,
        path_picture: 'path/to/picture',
        name: 'Sea View Room'
      });
  
      expect(createMock).toHaveBeenCalledTimes(1);
  
      createMock.mockRestore();
    });
});
