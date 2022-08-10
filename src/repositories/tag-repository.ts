import { postgres } from '../database/postgres';
import { Tag } from '../entities/Tag';
import { User } from '../entities/User';

const repository = postgres.getRepository(Tag);

class TagRepository {
  static async create(id: string, name: string, user_id: User) {
    const tag = repository.create({ id, name, user_id });

    await repository.save(tag);

    return tag;
  }

  static async findByName(name: string, userId: string) {
    const tag = await repository.findOneBy({
      name: name,
      user_id: { id: userId },
    });

    return tag;
  }

  static async findById(id: string) {
    const tag = await repository.findOneBy({ id });

    return tag;
  }

  static async findAll(id: string) {
    const tag = await repository.findBy({ user_id: { id } });

    return tag;
  }

  static async update(id: string, name: string) {
    const tag = await this.findById(id);

    tag.name = name;

    await repository.save(tag);

    return tag;
  }

  static async delete(id: string) {
    const tag = await this.findById(id);

    await repository.remove(tag);
  }
}

export { TagRepository };
