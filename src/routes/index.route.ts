import { Router, Request, Response } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';
import { UserRoutes } from '@routes/user.route';
import { AuthRoutes } from '@routes/auth.route';
import { TaskRoutes } from '@routes/task.route';

export class IndexRoutes implements Routes {
  readonly path = '/';
  readonly router = Router();
  readonly controller = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.index);

    this.router.use(`${this.path}users`, new UserRoutes().router);

    this.router.use(`${this.path}auth`, new AuthRoutes().router);

    this.router.use(`${this.path}tasks`, new TaskRoutes().router);
  }
}
