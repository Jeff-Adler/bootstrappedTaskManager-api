import { RequestWithUser } from '@interfaces/requestWithUser.interface';
import { TaskService } from '@services/task.service';
import { Response, NextFunction } from 'express';

export class TaskController {
  private taskService: TaskService = new TaskService();

  public async getTasks(req: RequestWithUser, res: Response, next: NextFunction) {
    const { id } = req.user!;

    try {
      const tasks = await this.taskService.getTasks(id);

      return tasks;
    } catch (error) {
      next();
    }
  }

  public getTaskById(req: RequestWithUser, res: Response, next: NextFunction) {}

  public createTask(req: RequestWithUser, res: Response, next: NextFunction) {}

  // update Complete or Description
  public updateTask(req: RequestWithUser, res: Response, next: NextFunction) {}

  public deleteTask(req: RequestWithUser, res: Response, next: NextFunction) {}
}
