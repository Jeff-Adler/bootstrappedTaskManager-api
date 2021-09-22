import { Router, Request, Response } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';
import { UserRoutes } from './user.route';
import { AuthRoutes } from './auth.route';

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
  }
}
