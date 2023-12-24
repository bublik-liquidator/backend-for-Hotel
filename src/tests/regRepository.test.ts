import { expect } from 'chai';
import sinon from 'sinon';
import regRepository from '../repository/regRepository';
import User from '../models/User';

describe('Registration Repository', () => {
  describe('registerUser', () => {
    it('should register a new user and return it', async () => {
      const mockUserRequest = { 
        username: 'User1', 
        login: 'login1', 
        password: 'password1',
        photo: 'photo1',
        birthday: 'birthday1',
        phonenomber: 'phonenomber1',
        email: 'email1',
        many: '100',
        role: 'role1'
      };
      const mockUser = { id: 1, ...mockUserRequest };

      const stub = sinon.stub(User, 'create').returns(Promise.resolve<any>(mockUser));
      const user = await regRepository.registerUser(mockUserRequest);

      expect(user).to.equal(mockUser);
      expect(stub.calledOnce).to.be.true;
    });
  });
});
