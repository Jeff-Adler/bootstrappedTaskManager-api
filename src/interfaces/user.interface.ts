import { Task } from '@entity/task.entity';
import { IEntity } from '@interfaces/entity.interface';

export interface IUser extends IEntity {
  id: number;
  email: string;
  password: string;
  tasks: Task[];
}
