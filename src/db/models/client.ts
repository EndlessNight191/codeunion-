import { config } from '../../config/config';
import { Knex } from 'knex';

const pg: Knex = require('knex')({
  client: 'pg',
  connection: {
    host: config.db.HOST,
    port: config.db.PORT,
    user: config.db.USER,
    database: config.db.NAME,
    password: config.db.PASSWORD,
  }
});

export default pg;