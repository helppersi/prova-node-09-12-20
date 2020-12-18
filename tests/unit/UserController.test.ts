import request from 'supertest';
import { server } from '../../src/index';
import { Authenticator } from '../../src/services/Authenticator';
import { UserInputDTO, UserRole } from '../../src/model/User';


describe('Testing product creation in controller layer', () => {
  afterEach(async () => {
    await server.close();
  });
  test('It should create an user when all the information is provided', async () => {
    const userMock: UserInputDTO = {
      name: 'admin',
      username: 'admin1',
      email: 'admin@gmail.com',
      password: '123456',
      role: UserRole.ADMIN

    };

    const { body } = await request(server)
      .post(`/user/signup`)
      .expect(201)
      .send(userMock);
  });
  test('It should not create an user when there is no email provided ', async () => {
    const userMock = {
      name: 'admin',
      username: 'admin1',
      password: '123456',
      role: UserRole.ADMIN

    };

    const { body } = await request(server)
      .post(`/user/signup`)
      .expect(400)
      .send(userMock)
    expect(body.error).toBe('Username, name, username, password and role are mandatory fields')
  });
});