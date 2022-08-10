import { Request, Response } from 'express';
import { GeneratePasswordService } from '../../services/password/generate-password-service';

class GeneratePasswordController {
  static async execute(request: Request, response: Response) {
    const { length } = request.body;
    const passwordLength = Number(length);

    const result = await GeneratePasswordService.execute(passwordLength);

    return response.status(201).json(result);
  }
}

export { GeneratePasswordController };
