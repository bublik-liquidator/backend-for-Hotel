import regRepository from '../repository/regRepository';

async function register(user:{ login: string; password: string; }) {
    return await regRepository.registerUser(user);
  }
  
  export default {
    register
  };