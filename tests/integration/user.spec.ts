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
  await postgres.query('TRUNCATE TABLE users, tags, passwords');
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
    expect(response.body).toHaveProperty('created_at');
    expect(response.body).toHaveProperty('updated_at');
  });

  it('Should be able to authenticate a user', async () => {
    await request(app).post('/api/v1/sign-up').send(user);

    const response = await request(app)
      .post('/api/v1/sign-in')
      .send({ email: user.email, password: user.password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('access_token');
    expect(response.body).toHaveProperty('refresh_token');
  });

  it('Should be able to refresh a token', async () => {
    const response = await request(app).post('/api/v1/sign-up').send(user);
    const token = await request(app)
      .post('/api/v1/sign-in')
      .send({ email: user.email, password: user.password });

    const refreshToken = await request(app)
      .post(`/api/v1/refresh-token/${response.body.id}`)
      .send({
        refresh_token: token.body.refresh_token.token,
      });

    expect(refreshToken.status).toBe(201);
    expect(refreshToken.body).toHaveProperty('access_token');
  });

  it('Should be able to update a user', async () => {
    const response = await request(app).post('/api/v1/sign-up').send(user);
    const token = await request(app)
      .post('/api/v1/sign-in')
      .send({ email: user.email, password: user.password });

    const updatedUser = await request(app)
      .put(`/api/v1/settings/${response.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' })
      .send({ name: 'test2' });

    expect(updatedUser.status).toBe(201);
    expect(updatedUser.body).toHaveProperty('id');
    expect(updatedUser.body).toHaveProperty('name');
    expect(updatedUser.body).toHaveProperty('email');
    expect(updatedUser.body).toHaveProperty('created_at');
    expect(updatedUser.body).toHaveProperty('updated_at');
    expect(updatedUser.body.name).toBe('test2');
  });

  it('Should be able to delete a user', async () => {
    const response = await request(app).post('/api/v1/sign-up').send(user);
    const token = await request(app)
      .post('/api/v1/sign-in')
      .send({ email: user.email, password: user.password });

    const deletedUser = await request(app)
      .delete(`/api/v1/settings/${response.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' });

    expect(deletedUser.status).toBe(204);
  });
});
