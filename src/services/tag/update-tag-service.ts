import { TagRepository } from '../../repositories/tag-repository';

class UpdateTagService {
  static async execute(tagId: string, name: string) {
    const tag = await TagRepository.findById(tagId);

    if (!tag) {
      return new Error('Tag does not exists');
    }

    const result = await TagRepository.update(tagId, name);

    return result;
  }
}

export { UpdateTagService };
