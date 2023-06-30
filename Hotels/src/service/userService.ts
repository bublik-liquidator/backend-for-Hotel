import { UserRequest } from "../dto/userRequest.dto";
import { UserDTO } from "../dto/user.dto";
import userRepository from "../repository/userRepository";

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

function deleteById(userId: number) {
  return userRepository.deleteById(userId);
}

export default {
  getAll,
  getById,
  post,
  put,
  deleteById,
};