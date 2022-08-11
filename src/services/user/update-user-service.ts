import { hash } from 'bcryptjs';
import { UserRepository } from '../../repositories/user-repository';

type User = {
  name?: string;
  email?: string;
  password?: string;
};

class UpdateUserService {
  static async execute(id: string, props: User) {
    const { name, email, password } = props;

    const userExists = await UserRepository.findById(id);
    if (!userExists) {
      return new Error('User does not exists');
    }

    const result = await UserRepository.update(
      id,
      name ?? userExists.name,
      email ?? userExists.email,
      password
        ? await hash(password, Number(process.env.SALT))
        : userExists.password
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

export { UpdateUserService };
