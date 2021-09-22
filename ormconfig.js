const config = require('@/config.js');

const { connection_name, host, port, username, password, name } = config.get('db');

module.exports = [
  {
    type: 'postgres',
    name: 'default',
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
  }
];
