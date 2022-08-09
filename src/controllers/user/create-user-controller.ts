import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/create-user-service';

class CreateUserController {
  static async execute(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const result = await CreateUserService.execute({
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

export { CreateUserController };
