import { NextFunction, Request, Response } from 'express';

class ValidateUpdateUserArguments {
  static handle(request: Request, response: Response, next: NextFunction) {
    const { ...user } = request.body;

    if (!Object.keys(user).length) {
      return response.status(400).json('Invalid arguments');
    }

    return next();
  }
}

export { ValidateUpdateUserArguments };
