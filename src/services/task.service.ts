import { Task } from '@entity/task.entity';
import { User } from '@entity/user.entity';
import { HttpException } from '@exceptions/HttpException';
import { EntityTarget, getRepository, Repository } from 'typeorm';

export class TaskService {
  private readonly taskEntity: EntityTarget<Task> = Task;
  private readonly userEntity: EntityTarget<User> = User;

  public getTasks = async (id: number) => {
    const taskRepository: Repository<Task> = getRepository(this.taskEntity);
    const userRepository: Repository<User> = getRepository(this.userEntity);

    const user: User | undefined = await userRepository.findOne(id);

    if (!user) {
      throw new HttpException(404, `Could not retrieve data`);
    }

    const tasks: Task[] = await taskRepository.find({ where: { user: { id: user.id } } });

    return tasks;
  };

  public getTaskById = async (id: number) => {
    const taskRepository: Repository<Task> = getRepository(this.taskEntity);

    const task: Task | undefined = await taskRepository.findOne(id);

    if (!task) {
      throw new HttpException(404, `Could not find task`);
    }

    return task;
  };
}
