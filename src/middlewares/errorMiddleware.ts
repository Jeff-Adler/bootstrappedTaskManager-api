import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { Logger } from '@utils/logger';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';
    const stack: string | undefined = error.stack;

    Logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}\n Stack:: ${stack}`);
    res.status(status).json({ message, stack });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
