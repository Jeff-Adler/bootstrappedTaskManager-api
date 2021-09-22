import { Task } from '@entity/task.entity';
import { User } from '@entity/user.entity';
import faker from 'faker';
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';

export class seeds1631562818169 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const dbConnection = getConnection();
    // Get all entities
    const entities = dbConnection.entityMetadatas;

    // Wipe database
    for (const entity of entities) {
      const repository = dbConnection.getRepository(entity.name);
      await repository.clear();
    }

    // Seed test user
    await dbConnection.getRepository('user').save({ email: 'test@test.com', password: '12345678' });

    // Seed random users
    for (let i = 0; i < 20; i++) {
      const email = faker.internet.email();
      const password = faker.internet.password(8);
      await dbConnection.getRepository('user').save({ email, password });
    }

    // Seed random tasks
    for (let i = 0; i < 80; i++) {
      const task = {
        description: faker.lorem.sentence(),
        completed: false,
        user: await getRandomUser()
      };
      await dbConnection.getRepository('tasks').save(task);
    }

    async function getRandomUser(): Promise<User> {
      let user = await dbConnection
        .getRepository('user')
        .createQueryBuilder()
        .select('user.id')
        .from(User, 'users')
        .orderBy('RANDOM()')
        .limit(1)
        .getOne();

      return user!;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const dbConnection = getConnection();
    // Get all entities
    const entities = dbConnection.entityMetadatas;

    // Wipe database
    for (const entity of entities) {
      const repository = dbConnection.getRepository(entity.name);
      await repository.clear();
    }
  }
}
