import { Task } from '@entity/task.entity';
import { User } from '@entity/user.entity';
import { HttpException } from '@exceptions/HttpException';
import { EntityTarget, getRepository, Repository } from 'typeorm';

export class TaskService {
  private readonly taskEntity: EntityTarget<Task> = Task;
  private readonly userEntity: EntityTarget<User> = User;

  public getTasks = async (id: number) => {
    const userRepository: Repository<User> = getRepository(this.userEntity);
    const taskRepository: Repository<Task> = getRepository(this.taskEntity);

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

  public createTask = async (id: number, description: string) => {
    const userRepository: Repository<User> = getRepository(this.userEntity);
    const taskRepository: Repository<Task> = getRepository(this.taskEntity);

    const task: Task = new Task();

    task.description = description;

    const user: User | undefined = await userRepository.findOne({ where: { id: id }, select: ['id'] });

    if (!user) {
      throw new HttpException(404, `Could not retrieve data`);
    }

    task.user = user;

    await taskRepository.save(task);

    const savedTask = taskRepository.findOne(task.id);

    if (!savedTask) {
      throw new HttpException(404, `Could not create new task`);
    }

    return savedTask;
  };

  public updateTask = async (id: number, attrs: Partial<Task>) => {
    if (!Object.keys(attrs).length) {
      throw new HttpException(400, "You're not userData");
    }

    const taskRepository: Repository<Task> = getRepository(this.taskEntity);

    const task: Task | undefined = await taskRepository.findOne(id);

    if (!task) {
      throw new HttpException(404, `Could not retrieve task`);
    }

    // We use this in lieu of .update, because .update doesn't trigger TypeORM entity lifecycle hooks.
    Object.assign(task, attrs);

    await taskRepository.save(task);

    return task;
  };

  public deleteTask = async (id: number) => {
    const taskRepository: Repository<Task> = getRepository(this.taskEntity);

    const task: Task | undefined = await taskRepository.findOne(id);

    if (!task) {
      throw new HttpException(404, `Could not retrieve task`);
    }

    await taskRepository.delete(id);

    return task;
  };
}
