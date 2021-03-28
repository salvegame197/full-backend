"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _winston = require('../config/winston'); var _winston2 = _interopRequireDefault(_winston);
var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);

class UserController {
  async show(req, res) {
    const user = await _user2.default.findById(req.user);
    if (!user) {
      _winston2.default.warn(`IP:${req.ip} GET/users Error on get user : ${user}`);
      res.status(401).json({ error: "Failed on Authenticate" });
    }
    _winston2.default.info(`IP:${req.ip}  GET/users : ${user}`);
    return res.json({ user: user.show() });
  }
  async store(req, res) {
    try {
      const { name, email, password } = req.body;
      const userExist = await _user2.default.findOne({ email });
      if (userExist) {
        _winston2.default.warn(
          `IP:${req.ip} POST/users Trying duplicate a user : ${JSON.stringify(
            req.body
          )}`
        );
        return res.status(400).json({ error: "Duplicate User" });
      }
      const user = await _user2.default.create({
        name,
        email,
        password,
      });
      _winston2.default.info(`IP:${req.ip} POST/users : ${user}`);
      return res.json({
        user: user.show(),
      });
    } catch (error) {
      _winston2.default.info(`IP:${req.ip} POST/users ${error}`);
      res.status(400).json({ error: "Failed on create user" });
    }
  }
  async update(req, res) {
    try {
      const user = await _user2.default.findById(req.user);
      const { name, email, password } = req.body;
      if (!user) {
        _winston2.default.warn(
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
      _winston2.default.info(`IP:${req.ip} PUT/users : ${user}`);
      return res.json({
        user: user.show(),
      });
    } catch (error) {}
  }

  async deleted(req, res) {
    const user = await _user2.default.findById(req.user);
    if (!user) {
      _winston2.default.warn(
        `IP:${req.ip} DELETE/users Failed on Authenticate : ${req.user}`
      );
      res.status(401).json({ error: "Failed on Authenticate" });
    }

    user.deleted = true;

    await user.save();
    _winston2.default.info(`IP:${req.ip} DELETE/users : ${user}`);
    return res.status(204).send();
  }
}

exports. default = new UserController();
