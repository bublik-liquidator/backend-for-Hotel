import { UserRequest } from "../dto/userRequest.dto";
import { UserDTO } from "../dto/user.dto";

import * as userRepository from '../repository/userRepository';


async function getAll(page: number, limit: number) {
  return await userRepository.getAll(page, limit);
}

async function getById(userId: number) {
  return await userRepository.getById(userId);
}
// async function getByLogin(userLogin: string) {
//   return await userRepository.getByLogin(userLogin);
// }


async function post(request: UserRequest) {
  return await userRepository.post(new UserRequest(request));
}

async function put(newuser: UserDTO, id: number) {
  return await userRepository.put(newuser, id);
}

async function change_password(newuser: UserDTO, id: number) {
  return await userRepository.change_password(newuser, id);
}

function deleteById(userId: number) {
  return userRepository.deleteById(userId);
}

export {
  getAll,
  getById,
  post,
  change_password,
  put,
  deleteById
};

