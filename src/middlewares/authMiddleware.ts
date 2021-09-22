const config = require('@/config.js');
import jwt from 'jsonwebtoken';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/requestWithUser.interface';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '@entity/user.entity';
import { DataStoredInToken } from '@interfaces/dataStoredInToken.interface';

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || req.header('Authorization')?.split('Bearer ')[1] || null;

    if (Authorization) {
      const secretKey: string = config.get('secret_key');
      const verificationResponse = jwt.verify(Authorization, secretKey) as DataStoredInToken;
      const userId = verificationResponse.id;

      const userRepository = getRepository(User);
      const user = await userRepository.findOne(userId, { select: ['id', 'email', 'password'] });

      if (user) {
        //makes req.user available across routes that pass auth middleware
        req.user = user;
        next();
      } else {
        next(new HttpException(404, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(404, 'Wrong authentication token'));
  }
};
