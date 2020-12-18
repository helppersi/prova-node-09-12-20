import {
  UserInputDTO,
  LoginInputDTO,
  UserRole,
  UserEditDTO,
} from '../model/User';
import { UserDatabase } from '../data/UserDatabase';
import { HashManager } from '../services/HashManager';
import { Authenticator } from '../services/Authenticator';
import { InvalidParameterError } from '../errors/InvalidParameterError';
import { IdGenerator } from '../services/IdGenerator';
import { NotFoundError } from '../errors/NotFoundError';

export class UserBusiness {
  async createUser(user: UserInputDTO) {
    const userDatabase = new UserDatabase();
    if (!user.username || !user.role || !user.name || !user.email || !user.password) {
      throw new InvalidParameterError('Username, name, username, password and role are mandatory fields');
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    if (user.role !== UserRole.ADMIN && user.role !== UserRole.USER) {
      throw new InvalidParameterError('Invalid Role. Roles supported: admin or user');
    }
    const hashManager = new HashManager();
    const cryptedPassword = await hashManager.hash(user.password)

    await userDatabase.createUser(
      id,
      user.username,
      user.name,
      user.email,
      cryptedPassword,
      user.role
    );
  }

  async getUserByUsername(user: LoginInputDTO) {
    const userDatabase = new UserDatabase();
    const userFromDb = await userDatabase.getUserByUsername(user.username);

    const hashManager = new HashManager();
    const hashCompare = await hashManager.compare(
      user.password,
      userFromDb.getPassword()
    );

    const authenticator = new Authenticator();
    const token = authenticator.generateToken(userFromDb.getRole());

    if (!hashCompare) {
      throw new InvalidParameterError('Invalid Password!');
    }

    return token;
  }

  async deleteUserById(id: string) {
    const userDatabase = new UserDatabase();
    const userFromDb = await userDatabase.getUserById(id);

    if (!userFromDb) {
      throw new NotFoundError("Resource not found, check id provided")
    }

    await userDatabase.deleteUserById(id)
  }

  async editUserById(id: string, editInformations: UserEditDTO) {
    const userDatabase = new UserDatabase();

    if (!id) {
      throw new InvalidParameterError('Id not provided!');
    }

    if (!editInformations) {
      throw new InvalidParameterError('Edit informations not provided!');
    }

    const userFromDb = await userDatabase.getUserById(id);

    if (!userFromDb) {
      throw new NotFoundError("Resource to edit not found, check id provided")
    }

    await userDatabase.editUserById(id, editInformations)

  }
}
