import { UserRepository } from '../repositories/user-repository';
import { Service } from '../util/services/Service';

type UpdateUser = {
  name?: string;
  email?: string;
  password?: string;
};

class UpdateUserService extends Service<UpdateUser> {
  private constructor(props: UpdateUser, id: string) {
    super(props, id);
  }

  static async execute(props: UpdateUser, id: string) {
    const user = new UpdateUserService(props, id);

    const userExists = await UserRepository.findById(user.id);
    if (!userExists) {
      return new Error('User does not exists');
    }

    const result = await UserRepository.update({
      id: user.id,
      name: user.props.name,
      email: user.props.email,
      password: user.props.password,
    });

    return result;
  }
}

export { UpdateUserService };
