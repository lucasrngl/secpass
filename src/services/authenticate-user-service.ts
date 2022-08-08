import { compare } from 'bcryptjs';
import { postgres } from '../database/postgres';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/user-repository';
import { Service } from '../util/services/Service';
import { GenerateAccessToken } from '../util/tokens/generate-access-token';
import { GenerateRefreshToken } from '../util/tokens/generate-refresh-token';

type AuthenticateUser = {
  email: string;
  password: string;
};

class AuthenticateUserService extends Service<AuthenticateUser> {
  private constructor(props: AuthenticateUser) {
    super(props);
  }

  static async execute(props: AuthenticateUser) {
    const user = new AuthenticateUserService(props);

    const userExists = await UserRepository.find(user.props.email);
    if (!userExists) {
      return new Error('Email or password are incorrect');
    }

    const passwordMatch = await compare(
      user.props.password,
      userExists.password
    );
    if (!passwordMatch) {
      return new Error('Email or password are incorrect');
    }

    const accessToken = GenerateAccessToken.execute(
      userExists.id,
      userExists.email
    );
    const refreshToken = GenerateRefreshToken.execute(userExists.id);

    return { accessToken, refreshToken };
  }
}

export { AuthenticateUserService };
