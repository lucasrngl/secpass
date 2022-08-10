import { TagRepository } from '../../repositories/tag-repository';

class ListTagService {
  static async execute(userId: string) {
    const result = await TagRepository.findAll(userId);

    if (!result) {
      return new Error('User has no tags');
    }

    return result;
  }
}

export { ListTagService };
