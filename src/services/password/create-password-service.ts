import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { PasswordRepository } from '../../repositories/password-repository';

class CreatePasswordService {
  static async execute(name: string, pass: string, userId: any, tagId?: any) {
    const password = {
      id: uuid(),
      name: name,
      password: await hash(pass, 8),
      user_id: userId,
      tag_id: tagId,
    };

    const result = await PasswordRepository.create(
      password.id,
      password.name,
      password.password,
      password.user_id,
      password.tag_id
    );

    return {
      id: result.id,
      name: result.name,
      created_at: result.created_at,
      updated_at: result.updated_at,
    };
  }
}

export { CreatePasswordService };
