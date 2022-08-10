import { TagRepository } from '../../repositories/tag-repository';
import { UserRepository } from '../../repositories/user-repository';

class UpdateTagService {
  static async execute(userId: string, tagId: string, name: string) {
    const tag = await TagRepository.findById(tagId);

    if (!tag) {
      return new Error('Tag does not exists');
    }

    const result = await TagRepository.update(tagId, name);

    return result;
  }
}

export { UpdateTagService };
