import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import { verifyToken } from "./jwt";

export const middlewareAuth = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('No token provided');
    }

    await verifyToken(token);
    return;
  } catch (err) {
    reply.code(401).send({ error: 'Unauthorized' });
  }
};