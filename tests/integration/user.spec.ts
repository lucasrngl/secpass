import request from 'supertest';
import { app } from '../../src/app';
import { postgres } from '../../src/database/postgres';

let user = {
  name: 'test',
  email: 'email@example.com',
  password: '123456',
};

beforeAll(async () => {
  await postgres.initialize();
});

afterEach(async () => {
  await postgres.query('TRUNCATE TABLE users');
});

afterAll(async () => {
  await postgres.destroy();
});

describe('User integration test suite', () => {
  it('Should be able to create a user', async () => {
    const response = await request(app).post('/api/v1/sign-up').send(user);

    expect(response.status).toBe(201);
    expect(response.body).toBeTruthy();
  });
});
