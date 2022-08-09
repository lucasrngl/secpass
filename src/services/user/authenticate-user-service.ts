import { compare } from 'bcryptjs';
import dayjs from 'dayjs';
import { UserRepository } from '../../repositories/user-repository';
import { GenerateAccessToken } from '../../util/tokens/generate-access-token';
import { GenerateRefreshToken } from '../../util/tokens/generate-refresh-token';

class AuthenticateUserService {
  static async execute(email: string, password: string) {
    const userExists = await UserRepository.findByEmail(email);
    if (!userExists) {
      return new Error('Email or password are incorrect');
    }

    const passwordMatch = await compare(password, userExists.password);
    if (!passwordMatch) {
      return new Error('Email or password are incorrect');
    }

    const accessToken = GenerateAccessToken.execute(
      userExists.id,
      userExists.email
    );
    const refreshToken = GenerateRefreshToken.execute(userExists.id);

    const expiresIn = dayjs().add(1, 'day').unix();

    return {
      access_token: accessToken,
      refresh_token: { token: refreshToken, expires_in: expiresIn },
    };
  }
}

export { AuthenticateUserService };
