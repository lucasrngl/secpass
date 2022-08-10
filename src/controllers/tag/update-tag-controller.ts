import { Request, Response } from 'express';
import { UpdateTagService } from '../../services/tag/update-tag-service';

class UpdateTagController {
  static async execute(request: Request, response: Response) {
    const { tag: tagId } = request.params;
    const { name } = request.body;

    const result = await UpdateTagService.execute(tagId, name);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(201).json(result);
  }
}

export { UpdateTagController };
