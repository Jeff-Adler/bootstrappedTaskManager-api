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
      const id = Number(req.params.id);

      const task = await this.taskService.getTaskById(id);

      return res.status(200).send(task);
    } catch (error) {
      next();
    }
  };

  public createTask = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { id } = req.user!;
      const { description } = req.body;

      const task = await this.taskService.createTask(id, description);

      return res.status(200).send(task);
    } catch (error) {
      next();
    }
  };

  // update Complete or Description
  public updateTask = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      const task = await this.taskService.updateTask(id, req.body);

      return res.status(200).send(task);
    } catch (error) {
      next();
    }
  };

  public deleteTask = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      const task = await this.taskService.deleteTask(id);

      return res.status(200).send(task);
    } catch (error) {
      next();
    }
  };
}
