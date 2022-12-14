import { TagRepository } from '../../repositories/tag-repository';

class DeleteTagService {
  static async execute(tagId: string) {
    const tag = await TagRepository.findById(tagId);

    if (!tag) {
      return new Error('Tag does not exists');
    }

    await TagRepository.delete(tagId);
  }
}

export { DeleteTagService };
