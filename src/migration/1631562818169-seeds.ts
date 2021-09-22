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
