import { sign } from 'jsonwebtoken';

class GenerateAccessToken {
  static execute(userId: string, userEmail: string) {
    const token = sign(
      { email: userEmail },
      'ea7e2c09-c254-45a4-ae0a-b37b54f00a64',
      {
        audience: 'accessToken',
        issuer: 'http://localhost:3000',
        subject: userId,
        expiresIn: '5m',
      }
    );

    return token;
  }
}

export { GenerateAccessToken };
