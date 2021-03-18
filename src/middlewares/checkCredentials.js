import User from '../models/user';
import { verify } from 'jsonwebtoken';
import jwt from '../config/jwt';

export default async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token does not found' });
  }
  const [, token] = authHeader.split(' ');
  try {
    const decoded = await verify(token, jwt.secret);
    const id = decoded.sub;

    const user = await User.findById(id);
    if (user.deleted === true) {
      return res.status(401).json({ error: 'Disabled User' });
    }

    req.user = id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid JWT Token' });
  }
}
