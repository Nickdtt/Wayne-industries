import jwt from 'jsonwebtoken';

const JWT_SECRET = 'my-secret-key';

export const generateToken = (email: string): string => {
  return jwt.sign({email}, JWT_SECRET);
};