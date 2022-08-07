import { hash } from 'bcryptjs';
import { Hash } from 'crypto';
import { postgres } from '../database/postgres';
import { User } from '../entities/User';
import { Repository } from '../util/repositories/Repository';

type UserProps = {
  name: string;
  email: string;
  password: string;
};

class UserRepository extends Repository<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  static async create(props: UserProps) {
    const userRepository = new UserRepository(props);
    const repository = postgres.getRepository(User);

    if (await repository.findOneBy({ email: userRepository.props.email })) {
      return new Error('Email already exists');
    }

    const user = repository.create({
      id: userRepository._id,
      name: userRepository.props.name,
      email: userRepository.props.email,
      password: await hash(userRepository.props.password, 8),
    });

    await repository.save(user);

    return user;
  }
}

export { UserRepository };
