import { NextFunction, Request, Response } from 'express';

class ValidateRefreshTokenArguments {
  static handle(request: Request, response: Response, next: NextFunction) {
    const { id, refreshToken } = request.body;

    if (!id || !refreshToken) {
      return response.status(400).json('Invalid arguments');
    }

    return next();
  }
}

export { ValidateRefreshTokenArguments };
