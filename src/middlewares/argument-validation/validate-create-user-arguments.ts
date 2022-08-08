import { NextFunction, Request, Response } from 'express';

class ValidateCreateUserArguments {
  static handle(request: Request, response: Response, next: NextFunction) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json('Invalid arguments');
    }

    return next();
  }
}

export { ValidateCreateUserArguments };
