import { DataSource } from 'typeorm';

const postgres = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'secpass',
  entities: [],
  migrations: [],
});

export { postgres };
