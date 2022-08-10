import { Request, Response } from 'express';
import { CreatePasswordService } from '../../services/password/create-password-service';

class CreatePasswordController {
  static async execute(request: Request, response: Response) {
    const { id: userId } = request.params;
    const { name, password, tagId } = request.body;

    const result = await CreatePasswordService.execute(
      name,
      password,
      userId,
      tagId
    );

    return response.status(201).json(result);
  }
}

export { CreatePasswordController };
