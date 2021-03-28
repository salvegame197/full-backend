import User from "../models/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwt";
import logger from "../config/winston";

class AuthController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`IP:${req.ip} Failed to find email`);
      return res.status(400).json({ error: "Credentials do not match" });
    }

    if (user.deleted === true) {
      logger.error(`IP:${req.ip} Disabled User`);
      return res.status(401).json({ error: "Disabled User" });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      logger.warn(`IP:${req.ip} Password do not match`);
      return res.status(400).json({ error: "Credentials do not match" });
    }

    const { secret, expiresIn } = jwtConfig;

    const token = jwt.sign({}, secret, {
      subject: String(user._id),
      expiresIn,
    });
    logger.error(`IP:${req.ip} Login Success User:${user}`);
    return res.json({ user: user.show(), token });
  }
}
export default new AuthController();
