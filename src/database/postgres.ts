import { DataSource } from 'typeorm';
import { Tag } from '../entities/Tag';
import { User } from '../entities/User';

const postgres = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'secpass',
  entities: [User, Tag],
  migrations: ['./src/**/migrations/*.{ts,js}'],
});

export { postgres };
