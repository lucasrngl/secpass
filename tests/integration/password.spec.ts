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

describe('Password integration test suite', () => {
  it('Should be able to generate a password', async () => {
    const response = await request(app).post('/api/v1/sign-up').send(user);
    const token = await request(app)
      .post('/api/v1/sign-in')
      .send({ email: user.email, password: user.password });

    const password = await request(app)
      .get(`/api/v1/passwords/generate/${response.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' })
      .send({ length: 15 });

    expect(password.status).toBe(201);
    expect(password.body).toHaveProperty('password');
  });

  it('Should be able to create a password', async () => {
    const response = await request(app).post('/api/v1/sign-up').send(user);
    const token = await request(app)
      .post('/api/v1/sign-in')
      .send({ email: user.email, password: user.password });
    const tag = await request(app)
      .post(`/api/v1/tags/${response.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' })
      .send({ name: 'test' });

    const password = await request(app)
      .post(`/api/v1/passwords/${response.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' })
      .send({ name: 'test', password: '123456', tag: tag.body.id });

    expect(password.status).toBe(201);
    expect(password.body).toHaveProperty('id');
    expect(password.body).toHaveProperty('name');
    expect(password.body).toHaveProperty('created_at');
    expect(password.body).toHaveProperty('updated_at');
  });

  it('Should be able to list all passwords', async () => {
    const response = await request(app).post('/api/v1/sign-up').send(user);
    const token = await request(app)
      .post('/api/v1/sign-in')
      .send({ email: user.email, password: user.password });
    const tag = await request(app)
      .post(`/api/v1/tags/${response.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' })
      .send({ name: 'test' });
    await request(app)
      .post(`/api/v1/passwords/${response.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' })
      .send({ name: 'test', password: '123456', tag: tag.body.id });

    const passwords = await request(app)
      .get(`/api/v1/passwords/${response.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' });

    expect(passwords.status).toBe(200);
    expect(passwords.body).toHaveLength(1);
  });

  it('Should be able to list passwords by tag', async () => {
    const response = await request(app).post('/api/v1/sign-up').send(user);
    const token = await request(app)
      .post('/api/v1/sign-in')
      .send({ email: user.email, password: user.password });
    const tag = await request(app)
      .post(`/api/v1/tags/${response.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' })
      .send({ name: 'test' });
    await request(app)
      .post(`/api/v1/passwords/${response.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' })
      .send({ name: 'test', password: '123456', tag: tag.body.id });

    const passwords = await request(app)
      .get(`/api/v1/passwords/${response.body.id}/${tag.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' });

    expect(passwords.status).toBe(200);
    expect(passwords.body).toHaveLength(1);
  });

  it('Should be able to update a password', async () => {
    const response = await request(app).post('/api/v1/sign-up').send(user);
    const token = await request(app)
      .post('/api/v1/sign-in')
      .send({ email: user.email, password: user.password });
    const tag = await request(app)
      .post(`/api/v1/tags/${response.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' })
      .send({ name: 'test' });
    const password = await request(app)
      .post(`/api/v1/passwords/${response.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' })
      .send({ name: 'test', password: '123456', tag: tag.body.id });

    const updatedPassword = await request(app)
      .put(`/api/v1/passwords/${response.body.id}/${password.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' })
      .send({ name: 'test2' });

    expect(updatedPassword.status).toBe(201);
    expect(updatedPassword.body.name).toBe('test2');
    expect(updatedPassword.body).toHaveProperty('id');
    expect(updatedPassword.body).toHaveProperty('name');
    expect(updatedPassword.body).toHaveProperty('created_at');
    expect(updatedPassword.body).toHaveProperty('updated_at');
  });

  it('Should be able to delete a password', async () => {
    const response = await request(app).post('/api/v1/sign-up').send(user);
    const token = await request(app)
      .post('/api/v1/sign-in')
      .send({ email: user.email, password: user.password });
    const tag = await request(app)
      .post(`/api/v1/tags/${response.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' })
      .send({ name: 'test' });
    const password = await request(app)
      .post(`/api/v1/passwords/${response.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' })
      .send({ name: 'test', password: '123456', tag: tag.body.id });

    const deletedPassword = await request(app)
      .delete(`/api/v1/passwords/${response.body.id}/${password.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' });

    expect(deletedPassword.status).toBe(204);
  });
});
