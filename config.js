const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, `./envs/.env.${process.env.ENVIRONMENT}`) });
const convict = require('convict');

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  ip_address: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT',
    arg: 'port'
  },
  secret_key: {
    doc: 'Secret Key for JWT ',
    format: String,
    default: '',
    env: 'SECRET_KEY',
    sensitive: true
  },
  db: {
    connection_name: {
      doc: 'TypeORM connection name',
      format: String,
      default: 'default',
      env: 'CONNECTION_NAME'
    },
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: '127.0.0.1',
      env: 'DB_HOST'
    },
    port: {
      doc: 'Database port',
      format: 'port',
      default: 5432,
      env: 'DB_PORT'
    },
    username: {
      doc: 'Database username',
      format: String,
      default: '',
      env: 'DB_USERNAME'
    },
    password: {
      doc: 'Database password',
      format: String,
      default: '',
      env: 'DB_PASSWORD',
      sensitive: true
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'users',
      env: 'NAME'
    }
  }
});

const env = config.get('env');
config.loadFile(`./config/${env}.json`);

config.validate({ allowed: 'strict' });

module.exports = config;
