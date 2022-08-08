import { hash } from 'bcryptjs';
import { postgres } from '../database/postgres';
import { User } from '../entities/User';

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

    const user = repository.findOneBy({ email });

    return user;
  }
}

export { UserRepository };
