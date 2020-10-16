import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import UserSchemas from '../Schemas/UserSchemas';

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserSchemas.find();
      return res.send(users);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserSchemas.create(req.body);
      return res.json(users);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      let { id } = req.params;
      const condition = { _id: id };
      let user = await UserSchemas.findOneAndUpdate(condition, req.body);
      if (!user) {
        res.status(404).send('User is not found.');
      }
      return res.json(user);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      let { id } = req.params;
      const condition = { _id: id };
      let user = await UserSchemas.findOneAndDelete(condition);
      if (!user) {
        res.status(404).send('User is not found.');
      }
      return res.sendStatus(200);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }
}

export default new UserController();
