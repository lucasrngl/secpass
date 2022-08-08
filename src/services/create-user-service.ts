import { UserRepository } from '../repositories/user-repository';
import { Service } from '../util/services/Service';

type CreateUser = {
  name: string;
  email: string;
  password: string;
};

class CreateUserService extends Service<CreateUser> {
  private constructor(props: CreateUser, id?: string) {
    super(props, id);
  }

  static async execute(props: CreateUser) {
    const user = new CreateUserService(props);

    if (await UserRepository.find(user.props.email)) {
      return new Error('Email already exists');
    }

    const result = UserRepository.create(
      user.id,
      user.props.name,
      user.props.email,
      user.props.password
    );

    return result;
  }
}

export { CreateUserService };
