import { RequestWithUser } from '@interfaces/requestWithUser.interface';
import { TaskService } from '@services/task.service';
import { Response, NextFunction } from 'express';

export class TaskController {
  private taskService: TaskService = new TaskService();

  public getTasks = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { id } = req.user!;

      const tasks = await this.taskService.getTasks(id);

      return res.status(200).send(tasks);
    } catch (error) {
      next();
    }
  };

  public getTaskById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const task = await this.taskService.getTaskById(id);
    } catch (error) {
      next();
    }
  };

  public createTask(req: RequestWithUser, res: Response, next: NextFunction) {}

  // update Complete or Description
  public updateTask(req: RequestWithUser, res: Response, next: NextFunction) {}

  public deleteTask(req: RequestWithUser, res: Response, next: NextFunction) {}
}
