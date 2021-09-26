import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const config = require('@/config.js');
import { CreateUserDto } from '@dtos/createUser.dto';
import { User } from '@entity/user.entity';
import { HttpException } from '@exceptions/HttpException';
import { EntityTarget, getRepository } from 'typeorm';
import { UserService } from './user.service';
import { TokenData } from '@interfaces/tokenData.interface';
import { DataStoredInToken } from '@interfaces/dataStoredInToken.interface';
import { IUser } from '@interfaces/user.interface';

export class AuthService {
  private readonly userService: UserService = new UserService();
  private readonly userEntity: EntityTarget<User> = User;

  public async register(userData: CreateUserDto): Promise<User> {
    const userRepository = getRepository(this.userEntity);
    const { email, password } = userData;

    if (await userRepository.findOne({ email })) {
      throw new HttpException(404, `User with email ${email} already exists!`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userService.createUser(email, hashedPassword);

    if (!user) {
      throw new HttpException(404, `Error occured when registering user`);
    }

    return user;
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string; user: User }> {
    const userRepository = getRepository(this.userEntity);
    const { email, password } = userData;

    const user = await userRepository.findOne({ email });

    if (!user) {
      throw new HttpException(404, `User of email ${email} not found`);
    }

    const isPasswordMatching: boolean = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      throw new HttpException(404, 'Invalid password');
    }

    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);

    return { cookie, user };
  }

  public async logout(userData: IUser): Promise<User> {
    if (!Object.keys(userData).length) {
      throw new HttpException(404, 'Invalid request');
    }

    const userRepository = getRepository(this.userEntity);
    const user: User | undefined = await userRepository.findOne({
      where: { email: userData.email, password: userData.password }
    });
    if (!user) {
      throw new HttpException(404, 'Could not find user');
    }

    return user;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = config.get('secret_key');
    const expiresIn: number = 60 * 60; //an hour

    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Secure; SameSite=None; path=/; Max-Age=${tokenData.expiresIn}`;
  }
}
