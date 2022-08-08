import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

class EnsureAuthenticated {
  static handle(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if (!authToken) {
      return response.status(401).json('Unauthorized');
    }

    const [, token] = authToken.split(' ');

    try {
      verify(token, 'ea7e2c09-c254-45a4-ae0a-b37b54f00a64');

      return next();
    } catch (error) {
      return response.status(401).json('Unauthorized');
    }
  }
}

export { EnsureAuthenticated };
