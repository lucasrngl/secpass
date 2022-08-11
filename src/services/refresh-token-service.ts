import { verify } from 'jsonwebtoken';
import { UserRepository } from '../repositories/user-repository';
import { GenerateAccessToken } from '../util/tokens/generate-access-token';

class RefreshTokenService {
  static async execute(id: string, refreshToken: string) {
    const user = await UserRepository.findById(id);

    try {
      verify(refreshToken, process.env.KEY, {
        audience: process.env.AUD_REFRESH,
        issuer: process.env.ISSUER,
        subject: user.id,
        complete: true,
      });
    } catch (error) {
      return new Error('Expired token');
    }

    const result = GenerateAccessToken.execute(user.id, user.email);

    return { access_token: result };
  }
}

export { RefreshTokenService };
