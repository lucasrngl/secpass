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

  it('Should be able to list all tags', async () => {
    const response = await request(app).post('/api/v1/sign-up').send(user);
    const token = await request(app)
      .post('/api/v1/sign-in')
      .send({ email: user.email, password: user.password });
    await request(app)
      .post(`/api/v1/tags/${response.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' })
      .send({ name: 'test' });

    const tags = await request(app)
      .get(`/api/v1/tags/${response.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' });

    expect(tags.status).toBe(200);
    expect(tags.body).toHaveLength(1);
  });

  it('Should be able to update a tag', async () => {
    const response = await request(app).post('/api/v1/sign-up').send(user);
    const token = await request(app)
      .post('/api/v1/sign-in')
      .send({ email: user.email, password: user.password });
    const tag = await request(app)
      .post(`/api/v1/tags/${response.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' })
      .send({ name: 'test' });

    const updatedTag = await request(app)
      .put(`/api/v1/tags/${response.body.id}/${tag.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' })
      .send({ name: 'test2' });

    expect(updatedTag.status).toBe(201);
    expect(updatedTag.body).toHaveProperty('id');
    expect(updatedTag.body).toHaveProperty('name');
    expect(updatedTag.body).toHaveProperty('created_at');
    expect(updatedTag.body).toHaveProperty('updated_at');
  });

  it('Should be able to delete a tag', async () => {
    const response = await request(app).post('/api/v1/sign-up').send(user);
    const token = await request(app)
      .post('/api/v1/sign-in')
      .send({ email: user.email, password: user.password });
    const tag = await request(app)
      .post(`/api/v1/tags/${response.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' })
      .send({ name: 'test' });

    const deletedTag = await request(app)
      .delete(`/api/v1/tags/${response.body.id}/${tag.body.id}`)
      .auth(token.body.access_token, { type: 'bearer' });

    expect(deletedTag.status).toBe(204);
  });
});
