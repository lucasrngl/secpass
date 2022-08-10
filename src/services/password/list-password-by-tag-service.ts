import { PasswordRepository } from '../../repositories/password-repository';

class ListPasswordByTagService {
  static async execute(tagId: string, userId: string) {
    const result = await PasswordRepository.findByTag(userId, tagId);

    if (!result) {
      return new Error('User has no passwords');
    }

    return result;
  }
}

export { ListPasswordByTagService };
