import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import { verifyToken } from "./jwt";

export default async function (fastify: FastifyInstance, opts: any) {
  fastify.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const token = request.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new Error('No token provided');
      }

      await verifyToken(token);
    } catch (err) {
      reply.code(401).send({ error: 'Unauthorized' });
    }
  });
}