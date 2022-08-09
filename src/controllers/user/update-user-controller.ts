import { Request, Response } from 'express';
import { UpdateUserService } from '../../services/user/update-user-service';

class UpdateUserController {
  static async execute(request: Request, response: Response) {
    const { id } = request.params;
    const { ...user } = request.body;

    const result = await UpdateUserService.execute(user, id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(201).json(result);
  }
}

export { UpdateUserController };
