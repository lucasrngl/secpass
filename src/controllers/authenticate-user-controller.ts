import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/authenticate-user-service';

class AuthenticateUserController {
  static async execute(request: Request, response: Response) {
    const { email, password } = request.body;

    const result = await AuthenticateUserService.execute({
      email,
      password,
    });

    if (result instanceof Error) {
      return response.status(401).json(result.message);
    }

    return response.status(200).json(result);
  }
}

export { AuthenticateUserController };