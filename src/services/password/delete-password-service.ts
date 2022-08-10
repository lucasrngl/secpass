import { PasswordRepository } from '../../repositories/password-repository';

class DeletePasswordService {
  static async execute(passwordId: string) {
    const password = await PasswordRepository.findById(passwordId);

    if (!password) {
      return new Error('Password does not exists');
    }

    await PasswordRepository.delete(passwordId);
  }
}

export { DeletePasswordService };
