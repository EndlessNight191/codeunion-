const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
  
export const config = {
  db: {
    HOST: process.env.HOST_DB || '',
    PORT: process.env.PORT_DB || '',
    USER: process.env.USER_DB || '',
    NAME: process.env.NAME_DB || '',
    PASSWORD: process.env.PASSWORD_DB || '',
  },
  PORT: process.env.PORT || 3000,
  secret_key: process.env.SECRET_KEY || '',
};