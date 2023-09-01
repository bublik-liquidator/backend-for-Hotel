import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repository/authRepository';

export const authService = {
  async register(login: string, password: string) {
    const user = await userRepository.findUserByEmail(login);
    if (user) {
      throw new Error('Email already in use');
    }
    await userRepository.createUser(login, password);
  },

  async login(login: string, password: string) {
    const user = await userRepository.findUserByEmail(login);
    if (!user) {
      throw new Error('Invalid login or password');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error('Invalid login or password');
    }
    const token = jwt.sign({ id: user.id }, 'secret');
    return token;
  }
};