const config = require('@/config.js');
import path from 'path';
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
  entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../**/*.migration{.ts,.js}')],
  migrationsRun: true,
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration'
  }
};
