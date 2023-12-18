import { config } from '../config/config'
import jwt from 'jsonwebtoken';

export const createToken = (id: string) => {
  const token = jwt.sign(
    {
      id
    },
    config.secret_key,
    { expiresIn: "2h", algorithm: 'HS256' }
  );
  return token;
};

export const verifyToken = async (
  token: string,
) => {
  try {
    const ops = await jwt.verify(
      token,
      config.secret_key,
      { algorithms: ['HS256'] }
    );
    return ops;
  } catch (error) {
    throw new Error('Invalid token'); // или обработка ошибки по вашему усмотрению
  }
};
  