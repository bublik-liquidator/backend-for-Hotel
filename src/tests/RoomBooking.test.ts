import RoomBooking from "../models/RoomBooking";

describe('RoomBooking Model', () => {
    it('should call RoomBooking.create when creating a room booking', async () => {
      const createMock = jest.spyOn(RoomBooking, 'create').mockImplementation();

      await RoomBooking.create({
        room_id: 1,
        booked_by_user_id: 1,
        date_from: '2022-01-01',
        date_to: '2022-01-31',
        payed: true,
        number: '101',
        name: 'Sea View Room'
      });
  
      expect(createMock).toHaveBeenCalledTimes(1);
  
      createMock.mockRestore();
    });
});
