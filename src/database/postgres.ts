import { DataSource } from 'typeorm';
import { Password } from '../entities/Password';
import { Tag } from '../entities/Tag';
import { User } from '../entities/User';

const postgres = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
  entities: [User, Tag, Password],
  migrations: ['./src/**/migrations/*.{ts,js}'],
});

export { postgres };
