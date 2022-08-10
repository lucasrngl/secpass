import { GeneratePassword } from '../../util/password/generate-password';

class GeneratePasswordService {
  static async execute(length: number) {
    const result = GeneratePassword.execute(length);

    return { password: result };
  }
}

export { GeneratePasswordService };
