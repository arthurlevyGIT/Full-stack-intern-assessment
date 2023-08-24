import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../auth';

export const authMiddleware = (handler: any) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token)
    return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET!, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Forbidden" });
    req.user = user;
    return handler(req, res);
  });
};