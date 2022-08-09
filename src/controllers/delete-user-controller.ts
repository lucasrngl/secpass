import { Request, Response } from 'express';
import { DeleteUserService } from '../services/delete-user-service';

class DeleteUserController {
  static async execute(request: Request, response: Response) {
    const { id } = request.params;

    const result = await DeleteUserService.execute(id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(204).end();
  }
}

export { DeleteUserController };
