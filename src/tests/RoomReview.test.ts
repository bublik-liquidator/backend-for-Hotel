import RoomReview from "../models/RoomReview";

describe('RoomReview Model', () => {
    it('should call RoomReview.create when creating a room review', async () => {
      const createMock = jest.spyOn(RoomReview, 'create').mockImplementation();

      await RoomReview.create({
        author_id: 1,
        room_id: 1,
        review: 'Great room!'
      });
  
      expect(createMock).toHaveBeenCalledTimes(1);
  
      createMock.mockRestore();
    });
});
