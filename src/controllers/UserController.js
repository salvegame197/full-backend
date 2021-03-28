import logger from "../config/winston";
import User from "../models/user";

class UserController {
  async show(req, res) {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(401).json({ error: "Failed on Authenticate" });
    }

    return res.json({ user: user.show() });
  }
  async index(req, res) {
    const users = await User.find();

    return res.json(users);
  }
  async store(req, res) {
    try {
      const { name, email, password } = req.body;
      const userExist = await User.findOne({ email });
      if (userExist) {
        logger.warn(
          `IP:${req.ip} Trying duplicate a user : ${JSON.stringify(req.body)}`
        );
        return res.status(400).json({ error: "Duplicate User" });
      }
      const user = await User.create({
        name,
        email,
        password,
      });
      logger.info(`IP:${req.ip} User created : ${user}`);
      return res.json({
        user: user.show(),
      });
    } catch (error) {
      logger.info(`IP:${req.ip} ${error}`);
      res.status(400).json({ error: "Failed on create user" });
    }
  }
  async update(req, res) {
    const user = await User.findById(req.user);
    const { name, email, password } = req.body;
    if (!user) {
      res.status(401).json({ error: "Failed on Authenticate" });
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

    return res.json({
      user: user.show(),
    });
  }

  async deleted(req, res) {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(401).json({ error: "Failed on Authenticate" });
    }

    user.deleted = true;

    await user.save();

    return res.status(204).send();
  }
}

export default new UserController();
