import { postgres } from '../database/postgres';
import { Password } from '../entities/Password';
import { Tag } from '../entities/Tag';
import { User } from '../entities/User';

const repository = postgres.getRepository(Password);

class PasswordRepository {
  static async create(
    id: string,
    name: string,
    password: string,
    user_id: User,
    tag_id: Tag
  ) {
    const pass = repository.create({ id, name, password, user_id, tag_id });

    await repository.save(pass);

    return pass;
  }

  static async findAll(id: string) {
    const password = await repository.findBy({ user_id: { id } });

    return password;
  }

  static async findByTag(userId: string, tagId: string) {
    const password = await repository.findBy({
      // user_id: { id: userId },
      tag_id: { id: tagId },
    });

    return password;
  }

  static async findById(id: string) {
    const password = await repository.findOneBy({ id });

    return password;
  }

  static async update(id: string, name: string, pass: string) {
    const password = await this.findById(id);

    password.name = name;
    password.password = pass;

    await repository.save(password);

    return password;
  }

  static async delete(id: string) {
    const password = await this.findById(id);

    await repository.remove(password);
  }
}

export { PasswordRepository };
