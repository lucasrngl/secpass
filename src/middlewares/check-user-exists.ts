import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../repositories/user-repository';

class CheckUserExists {
  static async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { id } = request.params;

    if (!(await UserRepository.findById(id))) {
      return response.status(400).json('User does not exists');
    }

    return next();
  }
}

export { CheckUserExists };
