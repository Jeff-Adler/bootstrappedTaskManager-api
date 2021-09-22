import { Request, Response, NextFunction } from 'express';
import { Logger } from '@utils/logger';

export const catchAllMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const status: number = 404;
  const message: string = 'Invalid request';

  Logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
  res.status(status).json({ message });
};
