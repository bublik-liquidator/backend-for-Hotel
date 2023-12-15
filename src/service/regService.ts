import { UserRequest } from '../dto/userRequest.dto';
import regRepository from '../repository/regRepository';

async function register(user: UserRequest) {
    return await regRepository.registerUser(user);
}
  
export default {
    register
};
