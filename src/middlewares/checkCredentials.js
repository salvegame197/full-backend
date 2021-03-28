import User from "../models/user";
import { verify } from "jsonwebtoken";
import jwt from "../config/jwt";
import logger from "../config/winston";

export default async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    logger.error(`IP:${req.ip} Token does not found`);
    return res.status(401).json({ error: "Token does not found" });
  }
  const [, token] = authHeader.split(" ");
  try {
    const decoded = await verify(token, jwt.secret);
    const id = decoded.sub;

    const user = await User.findById(id);
    if (user.deleted === true) {
      logger.error(`IP:${req.ip} | User:${user} Disabled User`);
      return res.status(401).json({ error: "Disabled User" });
    }

    req.user = id;
    return next();
  } catch (error) {
    logger.warn(`IP:${req.ip} Error ${error}`);
    return res.status(401).json({ error: "Invalid JWT Token" });
  }
}
