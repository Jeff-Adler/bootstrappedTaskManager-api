import { HttpException } from '@exceptions/HttpException';
import { Logger } from '@utils/logger';
import { plainToClass } from 'class-transformer';
import { validate, validateOrReject } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { requestProperty } from '@customTypes/requestProperty.type';

// export const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     next(new HttpException(404, 'Invalid request'));
//     // return res.status(400).json({ errors: errors.array() });
//     Logger.error(
//       `[${req.method}] ${req.path} >> StatusCode:: 404, Message:: { errors: ${JSON.stringify(errors.array())}`
//     );
//   } else {
//     next();
//   }
// };

export const validationMiddleware = (dto: any, requestProperty: requestProperty) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoClass = plainToClass(dto, req[requestProperty]);
    try {
      await validateOrReject(dtoClass, { skipMissingProperties: true, whitelist: true, forbidNonWhitelisted: true });
      next();
    } catch (errors) {
      next(new HttpException(404, 'Invalid request'));
      Logger.error(`[${req.method}] ${req.path} >> StatusCode:: 404, Message:: { errors: ${JSON.stringify(errors)}`);
    }
  };
};
