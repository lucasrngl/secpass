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
      verify(token, process.env.KEY);

      return next();
    } catch (error) {
      return response.status(401).json('Unauthorized');
    }
  }
}

export { EnsureAuthenticated };
