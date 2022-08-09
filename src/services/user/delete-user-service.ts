import { UserRepository } from '../../repositories/user-repository';

class DeleteUserService {
  static async execute(id: string) {
    const userExists = await UserRepository.findById(id);
    if (!userExists) {
      return new Error('User does not exists');
    }

    await UserRepository.delete(id);
  }
}

export { DeleteUserService };
