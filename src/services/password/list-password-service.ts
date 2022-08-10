import { PasswordRepository } from '../../repositories/password-repository';

class ListPasswordService {
  static async execute(userId: string) {
    const result = await PasswordRepository.findAll(userId);

    if (!result) {
      return new Error('User has no passwords');
    }

    return result;
  }
}

export { ListPasswordService };
