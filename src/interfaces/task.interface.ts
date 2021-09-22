import { User } from '@entity/user.entity';
import { IEntity } from '@interfaces/entity.interface';

export interface ITask extends IEntity {
  id: number;
  description: string;
  completed: boolean;
  user: User;
}
