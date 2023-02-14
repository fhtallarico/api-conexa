import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): void {
    res.on('finish', () => {
      Logger.log(
        `requested route: ${req.originalUrl} | method: ${req.method} | status: ${res.statusCode}`,
        LoggerMiddleware.name,
      );
    });

    next();
  }
}
