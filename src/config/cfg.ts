const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
  client: 'postgresql',
  connection: {
    host: process.env.HOST_DB || '',
    port: process.env.PORT_DB || '',
    user: String(process.env.USER_DB) || '',
    password: String(process.env.PASSWORD_DB) || '',
    database: process.env.NAME_DB || '',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: '../db/migrations',
  },
};