import { sign } from 'jsonwebtoken';

class GenerateRefreshToken {
  static execute(userId: string) {
    const token = sign({}, process.env.KEY, {
      audience: process.env.AUD_REFRESH,
      issuer: process.env.ISSUER,
      subject: userId,
      expiresIn: '1d',
    });

    return token;
  }
}

export { GenerateRefreshToken };
