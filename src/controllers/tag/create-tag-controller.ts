import { Request, Response } from 'express';
import { CreateTagService } from '../../services/tag/create-tag-service';

class CreateTagController {
  static async execute(request: Request, response: Response) {
    const { id: userId } = request.params;
    const { name } = request.body;

    const result = await CreateTagService.execute(name, userId);

    if (result instanceof Error) {
      return response.status(409).json(result.message);
    }

    return response.status(201).json(result);
  }
}

export { CreateTagController };
