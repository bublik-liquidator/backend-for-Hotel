import pino from 'pino';
import pretty from 'pino-pretty';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { UserRequest } from '../dto/userRequest.dto';

const loggerr = pino(pretty());

async function registerUser(user:UserRequest) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  
  try {
    const newUser = await User.create({ 
      username: user.username,
      password: hashedPassword,
      login: user.login,
      photo: user.photo,
      birthday: user.birthday,
      phonenomber: user.phonenomber,
      email: user.email,
      many: user.many,
      role: user.role
    });

    if (newUser) {
      loggerr.info("User registered!");
      return newUser;
    } else {
      loggerr.error("Registration failed!");
      throw new Error("Registration failed");
    }
  } catch (error) {
    loggerr.error(error);
    throw new Error("Repository registration error");
  }
};

export default { registerUser };
