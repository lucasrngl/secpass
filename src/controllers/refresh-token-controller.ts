import { Request, Response } from 'express';
import { RefreshTokenService } from '../services/refresh-token-service';

class RefreshTokenController {
  static async execute(request: Request, response: Response) {
    const { email, refreshToken } = request.body;

    const result = await RefreshTokenService.execute(email, refreshToken);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(201).json({ accessToken: result });
  }
}

export { RefreshTokenController };
