import { Request, Response } from 'express';
import { ListPasswordByTagService } from '../../services/password/list-password-by-tag-service';

class ListPasswordByTagController {
  static async execute(request: Request, response: Response) {
    const { id: userId, tag: tagId } = request.params;

    const result = await ListPasswordByTagService.execute(tagId, userId);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(200).json(result);
  }
}

export { ListPasswordByTagController };
