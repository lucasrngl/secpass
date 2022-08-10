import { Request, Response } from 'express';
import { DeleteTagService } from '../../services/tag/delete-tag-service';

class DeleteTagController {
  static async execute(request: Request, response: Response) {
    const { tag: tagId } = request.params;

    const result = await DeleteTagService.execute(tagId);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(204).end();
  }
}

export { DeleteTagController };
