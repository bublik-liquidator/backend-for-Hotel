import Hotel from "../models/Hotel";

describe('Hotel Model', () => {
    it('should call Hotel.create when creating a hotel', async () => {
      const createMock = jest.spyOn(Hotel, 'create').mockImplementation();

      await Hotel.create({
        name: 'testhotel',
        manager_id: 1,
        path_picture: ['testpath1', 'testpath2'],
        location: 'testlocation',
        services: ['testservice1', 'testservice2']
      });
  
      expect(createMock).toHaveBeenCalledTimes(1);
  
      createMock.mockRestore();
    });
});
