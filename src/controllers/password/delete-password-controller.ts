import { Request, Response } from 'express';
import { DeletePasswordService } from '../../services/password/delete-password-service';

class DeletePasswordController {
  static async execute(request: Request, response: Response) {
    const { password: passwordId } = request.params;

    const result = await DeletePasswordService.execute(passwordId);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(204).end();
  }
}

export { DeletePasswordController };
