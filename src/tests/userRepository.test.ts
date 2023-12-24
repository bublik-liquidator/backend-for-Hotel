import { expect } from 'chai';
import sinon from 'sinon';
import userService from '../service/userService';
import userRepository from '../repository/userRepository';

describe('User Service', () => {
  describe('getAll', () => {
    it('should return all users', async () => {
      const mockUsers = [
        { 
          id: 1, 
          username: 'User1', 
          login: 'login1', 
          password: 'password1',
          photo: 'photo1',
          birthday: 'birthday1',
          phonenomber: 'phonenomber1',
          email: 'email1',
          many: 100,
          role: 'role1',
          // добавьте остальные свойства здесь...
        },
        { 
          id: 2, 
          username: 'User2', 
          login: 'login2', 
          password: 'password2',
          photo: 'photo2',
          birthday: 'birthday2',
          phonenomber: 'phonenomber2',
          email: 'email2',
          many: 200,
          role: 'role2',
        },
      ];

      const stub = sinon.stub(userRepository, 'getAll').returns(Promise.resolve<any[]>(mockUsers));
      const users = await userService.getAll(1, 10);

      expect(users).to.equal(mockUsers);
      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('getById', () => {
    it('should return the user with the given id', async () => {
      const mockUser = { 
        id: 1, 
        username: 'User1', 
        login: 'login1', 
        password: 'password1',
        photo: 'photo1',
        birthday: 'birthday1',
        phonenomber: 'phonenomber1',
        email: 'email1',
        many: 100,
        role: 'role1',
       
      };

      const stub = sinon.stub(userRepository, 'getById').returns(Promise.resolve<any>(mockUser));
      const user = await userService.getById(1);

      expect(user).to.equal(mockUser);
      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('post', () => {
    it('should create a new user and return it', async () => {
      const mockUserRequest = { 
        username: 'User1', 
        login: 'login1', 
        password: 'password1',
        photo: 'photo1',
        birthday: 'birthday1',
        phonenomber: 'phonenomber1',
        email: 'email1',
        many: "100",
        role: 'role1',
      };
      const mockUser = { id: 1, ...mockUserRequest };

      const stub = sinon.stub(userRepository, 'post').returns(Promise.resolve<any>(mockUser));
      const user = await userService.post(mockUserRequest);

      expect(user).to.equal(mockUser);
      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('put', () => {
    it('should update the user with the given id and return it', async () => {
      const mockUser = { 
        id: 1, 
        username: 'User1', 
        login: 'login1', 
        password: 'password1',
        photo: 'photo1',
        birthday: 'birthday1',
        phonenomber: 'phonenomber1',
        email: 'email1',
        many: 100,
        role: 'role1',
        // добавьте остальные свойства здесь...
      };

      const stub = sinon.stub(userRepository, 'put').returns(Promise.resolve<any>(mockUser));
      const user = await userService.put(mockUser, 1);

      expect(user).to.equal(mockUser);
      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('deleteById', () => {
    it('should delete the user with the given id', async () => {
      const stub = sinon.stub(userRepository, 'deleteById').returns(Promise.resolve());

      await userService.deleteById(1);

      expect(stub.calledOnce).to.be.true;
    });
  });
});
