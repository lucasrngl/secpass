import { sign } from 'jsonwebtoken';

class GenerateRefreshToken {
  static execute(userId: string) {
    const token = sign({}, 'ea7e2c09-c254-45a4-ae0a-b37b54f00a64', {
      subject: userId,
      expiresIn: '1d',
    });

    return token;
  }
}

export { GenerateRefreshToken };
