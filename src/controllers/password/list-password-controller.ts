import { Request, Response } from 'express';
import { ListPasswordService } from '../../services/password/list-password-service';

class ListPasswordController {
  static async execute(request: Request, response: Response) {
    const { id: userId } = request.params;

    const result = await ListPasswordService.execute(userId);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(200).json(result);
  }
}

export { ListPasswordController };
