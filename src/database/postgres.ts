import { DataSource } from 'typeorm';
import { User } from '../entities/User';

const postgres = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'secpass',
  entities: [User],
  migrations: ['./src/**/migrations/*.{ts,js}'],
});

export { postgres };
