import { UserRequest } from '../dto/userRequest.dto';
import regRepository from '../repository/regRepository';
import userRepository from '../repository/userRepository';


async function registerAdmin(user: UserRequest) {
    return await regRepository.registerAdmin(user);
}
async function registerUser(user:UserRequest) {
    const existingUser = await userRepository.findUserByLogin(user.login);
    if (existingUser) {
      throw new Error("User with this login already exists");
    }
    else{
        return await regRepository.registerUser(user);
    }
}

export default {
    registerAdmin,registerUser
}
