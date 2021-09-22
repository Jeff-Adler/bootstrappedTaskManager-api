const config = require('@/config.js');
import { ConnectionOptions } from 'typeorm';

const { connection_name, host, port, username, password, name } = config.get('db');

export const dbConnectionObj: ConnectionOptions = {
  type: 'postgres',
  name: connection_name,
  host: host,
  port: port,
  username: username,
  password: password,
  database: name,
  synchronize: true,
  logging: false,
  entities: ['src/entity/*.entity.ts'],
  migrations: ['src/migration/*.ts'],
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/migration'
  }
};
