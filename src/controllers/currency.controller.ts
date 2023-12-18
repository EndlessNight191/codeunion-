import { FastifyReply, FastifyRequest } from 'fastify'
import { DbAction } from "../db/models";

export const currency = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const id: number = Number(request.params.id);
  const dataCurrency = await DbAction.findByIdCurrency(id);
  
  if (!dataCurrency) {
    reply.code(404).send({ error: 'Currency not found' });
    return;
  }
  
  reply.send({ dataCurrency });
}