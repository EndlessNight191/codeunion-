import { Knex } from "knex";

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const pg: Knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.HOST_DB || '',
    port: process.env.PORT_DB || '',
    user: String(process.env.USER_DB) || '',
    password: String(process.env.PASSWORD_DB) || '',
    database: process.env.NAME_DB || '',
  }
});

async function addCurrency(id: number, rate: string) {
  if (isNaN(parseFloat(rate)) || Number(rate) <= 0) {
    throw new Error('Invalid rate');
  }

  const rateFloat = rate.replace(/,/g, '.');
  await pg('currency').update({ rate: rateFloat }).where({ id });;
  console.log(`Update currency ${id} with rate ${rate}`);
}
  
const [id, rate] = process.argv.slice(2);
if (!id || !rate) {
  console.error('Usage: node addCurrency.js <id> <rate>');
  process.exit(1);
}
  
addCurrency(Number(id), rate).catch(console.error);
  