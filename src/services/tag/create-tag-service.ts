import { TagRepository } from '../../repositories/tag-repository';
import { v4 as uuid } from 'uuid';

class CreateTagService {
  static async execute(name: string, userId: any) {
    if (await TagRepository.find(name)) {
      return new Error('Tag already exists');
    }

    const tag = {
      id: uuid(),
      name: name,
      user_id: userId,
    };

    const result = await TagRepository.create(tag.id, tag.name, tag.user_id);

    return {
      id: result.id,
      name: result.name,
      created_at: result.created_at,
      updated_at: result.updated_at,
    };
  }
}

export { CreateTagService };
