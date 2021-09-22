import { Request, Response, NextFunction } from 'express';
import { normalizeEmailAddress } from '@utils/normalizeEmailAddress';
import { requestProperty } from '@customTypes/requestProperty.type';
import { HttpException } from '@exceptions/HttpException';

export const normalizeEmailMiddleware = (requestProperty: requestProperty) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { email } = req[requestProperty];
    try {
      const normalizedEmail = normalizeEmailAddress(`${email}`);
      req[requestProperty].email = normalizedEmail;
      console.log(req[requestProperty].email);
      next();
    } catch (error) {
      next(new HttpException(404, 'Invalid query'));
    }
  };
};
