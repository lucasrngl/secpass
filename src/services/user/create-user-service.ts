import { UserRepository } from '../../repositories/user-repository';
import { v4 as uuid } from 'uuid';
import { hash } from 'bcryptjs';

class CreateUserService {
  static async execute(name: string, email: string, password: string) {
    if (await UserRepository.findByEmail(email)) {
      return new Error('Email already exists');
    }

    const user = {
      id: uuid(),
      name: name,
      email: email,
      password: await hash(password, Number(process.env.SALT)),
    };

    const result = await UserRepository.create(
      user.id,
      user.name,
      user.email,
      user.password
    );

    return {
      id: result.id,
      name: result.name,
      email: result.email,
      created_at: result.created_at,
      updated_at: result.updated_at,
    };
  }
}

export { CreateUserService };
