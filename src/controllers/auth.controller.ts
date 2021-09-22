import { Request, Response, NextFunction } from 'express';
import { User } from '@entity/user.entity';
import { CreateUserDto } from '@dtos/createUser.dto';
import { AuthService } from '@services/auth.service';
import { LoginUserDto } from '@dtos/loginUser.dto';
import { RequestWithUser } from '@interfaces/requestWithUser.interface';
import { IUser } from '@interfaces/user.interface';

export class AuthController {
  public authService: AuthService = new AuthService();

  public register = async (req: Request, res: Response, next: NextFunction) => {
    const createUserData: CreateUserDto = req.body;

    try {
      const user: User = await this.authService.register(createUserData);

      const tokenData = this.authService.createToken(user);

      res.setHeader('Set-Cookie', [this.authService.createCookie(tokenData)]);
      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const loginUserData: LoginUserDto = req.body;

    try {
      const user: User = await this.authService.login(loginUserData);

      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: IUser = req.user!;
      const user: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).send(`Logged out ${user.email}`);
    } catch (error) {
      next(error);
    }
  };
}
