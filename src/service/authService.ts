import authRepository from '../repository/authRepository';

async function login(user:{ login: any; password: any; }) {
  return await authRepository.authenticateUser(user);
}

export default {
  login
};