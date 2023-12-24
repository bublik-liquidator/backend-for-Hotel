import authRepository from '../repository/authRepository';

async function authenticateUser(user:any) {
  return await authRepository.authenticateUser(user);
}

export default {
  authenticateUser
};
