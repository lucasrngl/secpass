import { Request, Response } from 'express';
import { ListTagService } from '../../services/tag/list-tag-service';

class ListTagController {
  static async execute(request: Request, response: Response) {
    const { id: userId } = request.params;

    const result = await ListTagService.execute(userId);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(200).json(result);
  }
}

export { ListTagController };
