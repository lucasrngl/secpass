import { Request, Response } from 'express';
import { UpdatePasswordService } from '../../services/password/update-password-service';

class UpdatePasswordController {
  static async execute(request: Request, response: Response) {
    const { password: passwordId } = request.params;
    const { name, password } = request.body;

    const result = await UpdatePasswordService.execute(
      passwordId,
      name,
      password
    );

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(201).json(result);
  }
}

export { UpdatePasswordController };
