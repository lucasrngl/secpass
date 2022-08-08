import { compare, hash } from 'bcryptjs';
import { postgres } from '../database/postgres';
import { User } from '../entities/User';
import { GenerateAccessToken } from '../util/tokens/generate-access-token';
import { GenerateRefreshToken } from '../util/tokens/generate-refresh-token';

class UserRepository {
  static async create(
    id: string,
    name: string,
    email: string,
    password: string
  ) {
    const repository = postgres.getRepository(User);

    const user = repository.create({
      id: id,
      name: name,
      email: email,
      password: await hash(password, 8),
    });

    await repository.save(user);

    return user;
  }

  static async find(email: string) {
    const repository = postgres.getRepository(User);

    const result = repository.findOneBy({ email });

    return result;
  }
}

export { UserRepository };
