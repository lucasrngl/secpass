import { Request, Response } from 'express';
import { UserRepository } from '../repositories/user-repository';

class CreateUser {
  static async execute(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const result = await UserRepository.create({
      name,
      email,
      password,
    });

    if (result instanceof Error) {
      return response.status(409).json(result.message);
    }

    return response.status(201).json(result);
  }
}

export { CreateUser };
