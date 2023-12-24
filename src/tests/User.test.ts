import User from "../models/User";

describe('User Model', () => {
    it('should call User.create when creating a user', async () => {
      const createMock = jest.spyOn(User, 'create').mockImplementation();

      await User.create({
        username: 'testuser',
        password: 'testpassword',
        login: 'testlogin',
        photo: 'testphoto',
        birthday: '2000-01-01',
        phonenomber: '1234567890',
        email: 'test@test.com',
        many: 1000,
        role: 'testrole'
      });
  
      expect(createMock).toHaveBeenCalledTimes(1);
  
      createMock.mockRestore();
    });
});
