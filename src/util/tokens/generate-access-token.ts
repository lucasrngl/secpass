import { sign } from 'jsonwebtoken';

class GenerateAccessToken {
  static execute(userId: string, userEmail: string) {
    const token = sign({ email: userEmail }, process.env.KEY, {
      audience: process.env.AUD_ACCESS,
      issuer: process.env.ISSUER,
      subject: userId,
      expiresIn: '5m',
    });

    return token;
  }
}

export { GenerateAccessToken };
