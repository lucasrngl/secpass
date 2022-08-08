import { NextFunction, Request, Response } from 'express';

class ValidateAuthenticationUserArguments {
  static handle(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json('Invalid arguments');
    }

    next();
  }
}

export { ValidateAuthenticationUserArguments };
