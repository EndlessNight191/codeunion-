import { FastifyReply, FastifyRequest } from 'fastify'
import { DbAction } from "../db/models";

export const currencies = async (
    request: FastifyRequest<{ Querystring: { page: number, limit: number } }>,
    reply: FastifyReply
  ) => {
  const page = Number(request.query.page) || 1;
  const limit = Number(request.query.limit) || 10;
  const offset = (page - 1) * limit;
  const dataCurrencies = await DbAction.getCurrency(offset, limit);
  
  reply.send({
    data: dataCurrencies,
    meta: {
      total: dataCurrencies.length
    }
  })
}