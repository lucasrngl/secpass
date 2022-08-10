import { hash } from 'bcryptjs';
import { PasswordRepository } from '../../repositories/password-repository';

class UpdatePasswordService {
  static async execute(passwordId: string, name?: string, password?: string) {
    const pass = await PasswordRepository.findById(passwordId);

    if (!pass) {
      return new Error('Password does not exists');
    }

    const result = await PasswordRepository.update(
      passwordId,
      name ?? pass.name,
      password ? await hash(password, 8) : pass.password
    );

    return result;
  }
}

export { UpdatePasswordService };
