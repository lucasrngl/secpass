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
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('password');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
  });

  it('Should be able to authenticate a user', async () => {
    await request(app).post('/api/v1/sign-up').send(user);

    const response = await request(app)
      .post('/api/v1/sign-in')
      .send({ email: user.email, password: user.password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
    expect(response.body).toHaveProperty('expiresIn');
  });

  it('Should be able to refresh a token', async () => {
    await request(app).post('/api/v1/sign-up').send(user);
    const response = await request(app)
      .post('/api/v1/sign-in')
      .send({ email: user.email, password: user.password });

    const token = await request(app)
      .post('/api/v1/refresh-token')
      .send({ email: user.email, refreshToken: response.body.refreshToken });

    expect(token.status).toBe(201);
    expect(token.body).toHaveProperty('accessToken');
  });
});
