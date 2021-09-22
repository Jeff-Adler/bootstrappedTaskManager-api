import { Request } from 'express';
import { IUser } from '@interfaces/user.interface';

export interface RequestWithUser extends Request {
  user?: IUser;
}
