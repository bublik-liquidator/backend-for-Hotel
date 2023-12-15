import pino from 'pino';
import pretty from 'pino-pretty';
import bcrypt from 'bcrypt';


const loggerr = pino(pretty());

import User from '../models/User';
import { UserDTO } from '../dto/user.dto';


export  async function getAll(page: number, size: number) {
  try {
    const users = await User.findAll({
      offset: (page - 1) * size,
      limit: size,
      order: [['id', 'ASC']]
    });
    if (users.length > 0) {
      loggerr.info("Users exists.");
      return users;
    } else {
      loggerr.info("I didn't find it.");
      return 0;
    }
  } catch (err) {
    loggerr.error(err);
    throw new Error("Repository getAll error");
  }
}

export async function getById(id: any): Promise<UserDTO> {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('User not found');
  }
  return new UserDTO(user);
}

export  async function post(userRequest: any) {
  try {
    const user = await User.create(userRequest);
    loggerr.info("Data has been saved!");
    return user;
  } catch (error) {
    loggerr.error(error);
    throw new Error("Repository post error");
  }
}

export  async function put(userDTO: any, id: number) {
  try {
    const user = await User.update(userDTO, {
      where: { id: id }
    });
    loggerr.info("User with ID:" + id + " updated successfully.");
    return user;
  } catch (error) {
    loggerr.error(error);
    throw new Error("Repository put error");
  }
}

export  async function change_password(userDTO: { password: any; username: any; login: any; }, id: number) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userDTO.password, saltRounds);

  try {
    const user = await User.update({ username: userDTO.username, login: userDTO.login, password: hashedPassword }, {
      where: { id: id }
    });
    loggerr.info("User with ID:" + id + " updated successfully.");
    return user;
  } catch (error) {
    loggerr.error(error);
    throw new Error("Repository put error");
  }
}

export  async function deleteById(id: any) {
  try {
    await User.destroy({
      where: { id: id }
    });
  } catch (err) {
    loggerr.error(err);
    throw new Error("Repository deleteById error");
  }
}


