import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/createUser.dto';
import { LoginUserDto } from '@dtos/loginUser.dto';
import { LogoutUserDto } from '@dtos/logoutUser.dto';
import { Routes } from '@interfaces/routes.interface';
import { authMiddleware } from '@middlewares/authMiddleware';
import { validationMiddleware } from '@middlewares/validationMiddleware';
import { Router } from 'express';

export class AuthRoutes implements Routes {
  readonly path: string = '/';
  readonly router: Router = Router();
  readonly authController: AuthController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}register`,
      [validationMiddleware(CreateUserDto, 'body')],
      this.authController.register
    );
    this.router.post(`${this.path}login`, [validationMiddleware(LoginUserDto, 'body')], this.authController.login);
    this.router.post(
      `${this.path}logout`,
      [validationMiddleware(LogoutUserDto, 'body'), authMiddleware],
      this.authController.logout
    );
  }
}
