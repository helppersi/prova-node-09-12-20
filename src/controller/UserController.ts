import { Request, Response } from 'express';
import { UserInputDTO, LoginInputDTO, UserRole } from '../model/User';
import { UserBusiness } from '../business/UserBusiness';
import { BaseDatabase } from '../data/BaseDatabase';
import { Authenticator } from '../services/Authenticator';
import { updateShorthandPropertyAssignment } from 'typescript';
import { UserDatabase } from '../data/UserDatabase';
import { NotFoundError } from '../errors/NotFoundError';

export class UserController {
  async signup(req: Request, res: Response) {
    try {
      const input: UserInputDTO = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        username: req.body.username,
        role: req.body.role
      };

      const userBusiness = new UserBusiness();
      const token = await userBusiness.createUser(input);

      res.status(201).send({ message: 'Sucess' });
    } catch (error) {
      res.status(400).send({ error: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  async login(req: Request, res: Response) {
    try {
      const loginData: LoginInputDTO = {
        username: req.body.username,
        password: req.body.password,
      };

      const userBusiness = new UserBusiness();
      const token = await userBusiness.getUserByUsername(loginData);

      res.status(200).send({ token });
    } catch (error) {
      res.status(400).send({ error: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const authenticator = new Authenticator();
      const token: any = req.headers.authorization;

      const role = authenticator.getData(token)

      if (!token) {
        return res.status(401).send({ error: 'Unauthorized' });
      }



      if (role !== UserRole.ADMIN) {
        return res.status(403).send({
          error:
            'Unauthorized, only admin has permission to delete users ',
        });
      }
      const id = req.params.id;

      const userDatabase = new UserDatabase();
      const userInDatabase = userDatabase.getUserById(id)

      if (!userInDatabase) {
        res.status(400).send({ error: 'User to delete not found, check id' });
      }

      const userBusiness = new UserBusiness();
      await userBusiness.deleteUserById(id);

      res.status(204).send({ message: 'Sucess' });
    } catch (error) {
      res.status(400).send({ error: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  async editUser(req: Request, res: Response) {
    try {
      const authenticator = new Authenticator();
      const token: any = req.headers.authorization;
      const id = req.params.id;

      const authorizationByRole = authenticator.getData(token)

      if (authorizationByRole !== UserRole.ADMIN) {
        return res.status(403).send({
          error:
            'Unauthorized, only admin has permission to edit users ',
        });
      }

      const userDatabase = new UserDatabase();
      const userInDatabase = userDatabase.getUserById(id)

      if (!userInDatabase) {
        res.status(400).send({ error: 'User to edit not found, check id' });
      }

      const editInformations = req.body

      const userBusiness = new UserBusiness()
      await userBusiness.editUserById(id, editInformations)
      res.status(200).send({ message: 'Sucess' });
    } catch (error) {
      res.status(400).send({ error: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }
}
