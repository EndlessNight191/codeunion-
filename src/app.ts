import Fastify from 'fastify'

import { login, currencies, currency } from './controllers';
import { config } from './config/config';
import middlewareAuth from './auth/middleware';


const fastify = Fastify();

fastify.get('/login', login); // GET - т.к  в данном случае мы ничего не создаем и не обновляем, просто получаем токен

fastify.register(middlewareAuth);

// валидацию лучше вынести в папку validations, но т.к всего два роутера напишу сразу тут
fastify.get('/currencies', {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        limit: { type: 'integer' },
        page: { type: 'integer' },
      },
    },
  },
}, currencies);

fastify.get('/currency/:id', {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
      },
    },
  },
}, currency);

const start = async () => {
  try {
    await fastify.listen({
      port: Number(config.PORT),
      host: 'localhost',
    });
    console.log(`Server is running at http://localhost:${Number(config.PORT)}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();