import { UserRequest } from "../dto/userRequest.dto";
import { UserDTO } from "../dto/user.dto";

import userRepository from '../repository/userRepository';

async function getAll(page: number, limit: number) {
  return await userRepository.getAll(page, limit);
}

async function getById(userId: number) {
  return await userRepository.getById(userId);
}

async function post(request: UserRequest) {
  return await userRepository.post(request);
}

async function put(newuser: UserDTO, id: number) {
  return await userRepository.put(newuser, id);
}

async function change_password(newuser: UserDTO, id: number) {
  const { password, username, login } = newuser;
  return await userRepository.change_password({ password, username, login }, id);
}

async function deleteById(userId: number) {
  return await userRepository.deleteById(userId);
}

export default {
  getAll,
  getById,
  post,
  change_password,
  put,
  deleteById
};
