import { createToken } from "../auth/jwt";
import { FastifyReply, FastifyRequest } from 'fastify'

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
    // мокаем userId, т.к улегчаем jwt авторизацию (без таблиц с user и т.д)
    const token = createToken('test')
    reply.send({ token });
}