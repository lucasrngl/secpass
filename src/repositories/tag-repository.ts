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

  static async find(name: string) {
    const tag = await repository.findOneBy({ name });

    return tag;
  }
}

export { TagRepository };
