import { FastifyInstance } from "fastify";
import { middlewareAuth } from "../auth/middleware";
import { currencies } from "../controllers";

export async function getRouteCurrency (fastify: FastifyInstance) {
  const currenciesRoute = fastify.route<{
    Querystring: { page: number; limit: number };
  }>({
    method: 'GET',
    url: '/currency/:id',
    preHandler: [middlewareAuth],
    schema: {
      querystring: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
        },
      },
    },
    handler: currencies
  });

  return currenciesRoute
}

export async function getRouteCurrencies (fastify: FastifyInstance) {
  const currenciesRoute = fastify.route<{
    Querystring: { page: number; limit: number };
  }>({
    method: 'GET',
    url: '/currencies',
    preHandler: [middlewareAuth],
    schema: {
      querystring: {
        type: 'object',
        properties: {
          limit: { type: 'integer' },
          page: { type: 'integer' },
        },
      },
    },
    handler: currencies
  });

  return currenciesRoute
}