import { TaskController } from '@controllers/task.controller';
import { CreateTaskDto } from '@dtos/createTask.dto';
import { Routes } from '@interfaces/routes.interface';
import { authMiddleware } from '@middlewares/authMiddleware';
import { validationMiddleware } from '@middlewares/validationMiddleware';
import { Router } from 'express';

export class TaskRoutes implements Routes {
  readonly path: string = '/';
  readonly router: Router = Router();
  readonly taskController: TaskController = new TaskController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.taskController.getTasks);

    this.router.get(`${this.path}:id`, authMiddleware, this.taskController.getTaskById);

    this.router.post(
      `${this.path}`,
      [validationMiddleware(CreateTaskDto, 'body'), authMiddleware],
      this.taskController.createTask
    );

    this.router.patch(`${this.path}`, authMiddleware, this.taskController.updateTask);

    this.router.delete(`${this.path}`, authMiddleware, this.taskController.deleteTask);
  }
}
