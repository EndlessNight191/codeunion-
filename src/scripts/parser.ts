import axios from "axios";
import xml2js from "xml2js";
import { Knex } from 'knex';

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

type itemChannelType = { 
  title: string[], 
  description: string[] 
}

async function getAndParseXML() {
  const response = await axios.get('http://www.nationalbank.kz/rss/rates_all.xml');

  const parser = new xml2js.Parser();
  parser.parseStringPromise(response.data).then(async function (result) {
    const resultArray: itemChannelType[] = result.rss.channel[0].item;
    const formattedData = resultArray.map(item => ({
      name: item.title[0],
      rate: parseFloat(item.description[0])
    }));
    
    await pg.transaction(async (trx: Knex.Transaction) => {
      trx('currency')
        .insert(formattedData)
        .then(() => console.log('Data inserted successfully'))
        .catch((err: any) => console.error('Error inserting data:', err));
    })
    process.exit(1);
  })
  .catch(function (err) {
    console.log(err);
    process.exit(1);
  });
}

getAndParseXML();
