import { verify } from 'jsonwebtoken';
import { UserRepository } from '../repositories/user-repository';
import { GenerateAccessToken } from '../util/tokens/generate-access-token';

class RefreshTokenService {
  static async execute(id: string, refreshToken: string) {
    const user = await UserRepository.findById(id);

    try {
      verify(refreshToken, 'ea7e2c09-c254-45a4-ae0a-b37b54f00a64', {
        audience: 'refreshToken',
        issuer: 'http://localhost:3000',
        subject: user.id,
        complete: true,
      });
    } catch (error) {
      return new Error('Expired token');
    }

    const result = GenerateAccessToken.execute(user.id, user.email);

    return result;
  }
}

export { RefreshTokenService };
