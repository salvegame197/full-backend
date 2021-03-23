"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);

class UserController {
  async show(req, res) {
    const user = await _user2.default.findById(req.user);
    if (!user) {
      res.status(401).json({ error: 'Failed on Authenticate' });
    }

    return res.json({ user: user.show() });
  }
  async index(req, res) {
    const users = await _user2.default.find();

    return res.json(users);
  }
  async store(req, res) {
    const { name, email, password } = req.body;
    const user = await _user2.default.create({
      name,
      email,
      password,
    });

    return res.json({
      user: user.show(),
    });
  }
  async update(req, res) {
    const user = await _user2.default.findById(req.user);
    const { name, email, password } = req.body;
    if (!user) {
      res.status(401).json({ error: 'Failed on Authenticate' });
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
    const user = await _user2.default.findById(req.user);
    if (!user) {
      res.status(401).json({ error: 'Failed on Authenticate' });
    }

    user.deleted = true;

    await user.save();

    return res.status(204).send();
  }
}

exports. default = new UserController();
