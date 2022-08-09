import { postgres } from '../database/postgres';
import { User } from '../entities/User';

const repository = postgres.getRepository(User);

class UserRepository {
  static async create(
    id: string,
    name: string,
    email: string,
    password: string
  ) {
    const user = repository.create({
      id,
      name,
      email,
      password,
    });

    await repository.save(user);

    return user;
  }

  static async findByEmail(email: string) {
    const user = await repository.findOneBy({ email });

    return user;
  }

  static async findById(id: string) {
    const user = await repository.findOneBy({ id });

    return user;
  }

  static async update(
    id: string,
    name: string,
    email: string,
    password: string
  ) {
    const user = await this.findById(id);

    user.name = name;
    user.email = email;
    user.password = password;

    await repository.save(user);

    return user;
  }

  static async delete(id: string) {
    const user = await this.findById(id);

    await repository.remove(user);
  }
}

export { UserRepository };
