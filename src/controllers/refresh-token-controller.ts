import { Request, Response } from 'express';
import { RefreshTokenService } from '../services/refresh-token-service';

class RefreshTokenController {
  static async execute(request: Request, response: Response) {
    const { id } = request.params;
    const { refresh_token: refreshToken } = request.body;

    const result = await RefreshTokenService.execute(id, refreshToken);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(201).json(result);
  }
}

export { RefreshTokenController };
