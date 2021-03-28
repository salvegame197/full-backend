import logger from "../config/winston";
import User from "../models/user";

class UserController {
  async show(req, res) {
    const user = await User.findById(req.user);
    if (!user) {
      logger.warn(`IP:${req.ip} GET/users Error on get user : ${user}`);
      res.status(401).json({ error: "Failed on Authenticate" });
    }
    logger.info(`IP:${req.ip}  GET/users : ${user}`);
    return res.json({ user: user.show() });
  }
  async store(req, res) {
    try {
      const { name, email, password } = req.body;
      const userExist = await User.findOne({ email });
      if (userExist) {
        logger.warn(
          `IP:${req.ip} POST/users Trying duplicate a user : ${JSON.stringify(
            req.body
          )}`
        );
        return res.status(400).json({ error: "Duplicate User" });
      }
      const user = await User.create({
        name,
        email,
        password,
      });
      logger.info(`IP:${req.ip} POST/users : ${user}`);
      return res.json({
        user: user.show(),
      });
    } catch (error) {
      logger.info(`IP:${req.ip} POST/users ${error}`);
      res.status(400).json({ error: "Failed on create user" });
    }
  }
  async update(req, res) {
    try {
      const user = await User.findById(req.user);
      const { name, email, password } = req.body;
      if (!user) {
        logger.warn(
          `IP:${req.ip} PUT/users Failed on Authenticate : ${req.user}`
        );
        return res.status(401).json({ error: "Failed on Authenticate" });
      }

      if (name) {
        user.name = name;
      }
      if (email) {
        user.email = email;
      }
      if (password) {
        user.password = password;
      }

      await user.save();
      logger.info(`IP:${req.ip} PUT/users : ${user}`);
      return res.json({
        user: user.show(),
      });
    } catch (error) {}
  }

  async deleted(req, res) {
    const user = await User.findById(req.user);
    if (!user) {
      logger.warn(
        `IP:${req.ip} DELETE/users Failed on Authenticate : ${req.user}`
      );
      res.status(401).json({ error: "Failed on Authenticate" });
    }

    user.deleted = true;

    await user.save();
    logger.info(`IP:${req.ip} DELETE/users : ${user}`);
    return res.status(204).send();
  }
}

export default new UserController();
