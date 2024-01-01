import { Op } from 'sequelize';
import pino from 'pino';
import pretty from 'pino-pretty';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { UserDTO } from '../dto/user.dto';

const logger = pino(pretty());

async function getAll(page: number, size: number) {
  try {
    const result = await User.findAll({
      offset: (page - 1) * size,
      limit: size,
      order: [['id', 'ASC']]
    });
    if (result.length > 0) {
      logger.info("Users exist.");
      return result;
    } else {
      return [];
    }
  } catch (err) {
    logger.error(err);
    throw new Error("Repository getAll error");
  }
}

async function getById(id: number) {
  try {
    const result = await User.findByPk(id);
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (err) {
    logger.error(`Repository getById error for user with id: ${id}`, err);
    throw new Error("Repository getById error");
  }
}

async function post(user: any) {
  try {
    const result = await User.create(user);
    logger.info("Data has been saved!");
    return result;
  } catch (error) {
    logger.error(error);
    throw new Error("Repository post error");
  }
}

async function put(user: UserDTO, id: number) {
  try {
    const updateResult = await User.update(user, {
      where: { id: id }
    });
    console.log(updateResult)
    if (updateResult[0] > 0) { 
      const updatedUser = await User.findByPk(id); 
      logger.info("User with ID:" + id + " updated successfully.");
      return updatedUser; 
    } else {
      throw new Error("No rows were updated");
    }
  } catch (error) {
    logger.error(error);
    throw new Error("Repository put error");
  }
}

async function change_password(userDTO: { password: any; username: any; login: any; }, id: number) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userDTO.password, saltRounds);

  try {
    const user = await User.update({ username: userDTO.username, login: userDTO.login, password: hashedPassword }, {
      where: { id: id }
    });
    logger.info("User with ID:" + id + " updated successfully.");
    return user;
  } catch (error) {
    logger.error(error);
    throw new Error("Repository put error");
  }
}

async function deleteById(id: number) {
  try {
    await User.destroy({
      where: { id: id }
    });
  } catch (err) {
    logger.error(err);
    throw new Error("Repository deleteById error");
  }
}
async function findUserByLogin(login: any) {
  try {
    const user = await User.findOne({ where: { login: login } });
    return user;
  } catch (error) {
    logger.error(error);
    throw new Error("Repository find user by login error");
  }
};
export default {
  getAll,
  getById,
  post,
  put,
  change_password,
  deleteById,
  findUserByLogin
};
