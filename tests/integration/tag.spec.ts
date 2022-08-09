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
  await postgres.query('TRUNCATE TABLE users, tags');
});

afterAll(async () => {
  await postgres.destroy();
});

describe('Tag integration test suite', () => {
  it('Should be able to create a tag', async () => {
    const response = await request(app).post('/api/v1/sign-up').send(user);
    const token = await request(app)
      .post('/api/v1/sign-in')
      .send({ email: user.email, password: user.password });

    const tag = await request(app)
      .post(`/api/v1/tags/${response.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' })
      .send({ name: 'test' });

    expect(tag.status).toBe(201);
    expect(tag.body).toHaveProperty('id');
    expect(tag.body).toHaveProperty('name');
    expect(tag.body).toHaveProperty('created_at');
    expect(tag.body).toHaveProperty('updated_at');
  });
});
