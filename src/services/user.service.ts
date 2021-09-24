import { User } from '@entity/user.entity';
import { HttpException } from '@exceptions/HttpException';
import { EntityTarget, FindManyOptions, getRepository, OrderByCondition } from 'typeorm';

export class UserService {
  private readonly userEntity: EntityTarget<User> = User;

  public findUsers = async (findOptions: FindManyOptions<User>): Promise<User[]> => {
    const userRepository = getRepository(this.userEntity);

    const users: User[] = await userRepository.find(findOptions);

    return users;
  };

  public findUserById = async (id: number): Promise<User> => {
    const userRepository = getRepository(this.userEntity);

    const user: User | undefined = await userRepository.findOne(id);

    if (!user) {
      throw new HttpException(404, `User of id ${id} not found`);
    }

    return user;
  };

  findUserByEmail = async (email: string): Promise<User[]> => {
    const userRepository = getRepository(this.userEntity);

    const users: User[] = await userRepository.find({ email });

    if (!users.length) {
      throw new HttpException(404, `User of email ${email} not found`);
    }

    return users;
  };

  createUser = async (email: string, password: string) => {
    const userRepository = getRepository(this.userEntity);

    let user = userRepository.create({ email, password });

    await userRepository.save(user);

    // Necessary extra step to trigger lifecycle methods
    const savedUser = await userRepository.findOne(user.id);

    if (!savedUser) {
      throw new HttpException(404, `Could not create new user`);
    }

    return savedUser;
  };

  updateUser = async (id: number, attrs: Partial<User>) => {
    if (!Object.keys(attrs).length) {
      throw new HttpException(400, 'Nothing to update');
    }

    const userRepository = getRepository(this.userEntity);

    const user: User | undefined = await userRepository.findOne(id);

    if (!user) {
      throw new HttpException(404, `User of id ${id} not found`);
    }

    // We use this in lieu of .update, because .update doesn't trigger TypeORM entity lifecycle hooks.
    Object.assign(user, attrs);

    await userRepository.save(user);

    return userRepository.findOne(user.id);
  };

  deleteUser = async (id: number) => {
    const userRepository = getRepository(this.userEntity);

    const user: User | undefined = await userRepository.findOne(id);

    if (!user) {
      throw new HttpException(404, `User of id ${id} not found`);
    }

    await userRepository.delete(id);

    return user;
  };
}
