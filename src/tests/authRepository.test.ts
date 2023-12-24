import { expect } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import authService from '../service/authService';
import User from '../models/User';

describe('Authentication Service', () => {
  describe('authenticateUser', () => {
    it('should authenticate a user and return a token', async () => {
      const mockUserRequest = { 
        login: 'user1', 
        password: 'password1'
      };
      const mockUser = { 
        id: 1, 
        role: 'user',
        password: await bcrypt.hash('password1', 10)
      };

      sinon.stub(User, 'findOne').returns(Promise.resolve<any>(mockUser));
      const token = await authService.authenticateUser(mockUserRequest);

      const decodedToken = jwt.decode(token);
      expect(decodedToken).to.have.property('id', mockUser.id);
      expect(decodedToken).to.have.property('role', mockUser.role);
    });
  });
});
