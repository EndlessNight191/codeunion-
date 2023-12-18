import Fastify, { FastifyBaseLogger, FastifyInstance, FastifyReply, FastifyRequest, FastifySchema, FastifyTypeProviderDefault, RawServerDefault } from 'fastify'

import { login, currencies, currency } from './controllers';
import { config } from './config/config';
import { middlewareAuth } from './auth/middleware';
import { getRouteCurrencies, getRouteCurrency } from './routes/currency';


const fastify = Fastify();

fastify.get('/login', login); // GET - т.к  в данном случае мы ничего не создаем и не обновляем, просто получаем токен

fastify.register(getRouteCurrencies)
fastify.register(getRouteCurrency)

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