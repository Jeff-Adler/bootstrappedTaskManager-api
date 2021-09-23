import { Task } from '@entity/task.entity';
import { User } from '@entity/user.entity';
import { HttpException } from '@exceptions/HttpException';
import { EntityTarget, getRepository, Repository } from 'typeorm';

export class TaskService {
  private readonly taskEntity: EntityTarget<Task> = Task;

  public async getTasks(id: number) {
    const taskRepository: Repository<Task> = getRepository(this.taskEntity);
    const userRepository: Repository<User> = getRepository(User);

    const user: User | undefined = await userRepository.findOne({ id });

    if (!user) {
      throw new HttpException(404, `Could not retrieve data`);
    }

    const tasks: Task[] = await taskRepository.find({ where: { user: User } });

    return tasks;
  }
}
