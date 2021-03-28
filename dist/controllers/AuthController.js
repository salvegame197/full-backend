"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _jwt = require('../config/jwt'); var _jwt2 = _interopRequireDefault(_jwt);
var _winston = require('../config/winston'); var _winston2 = _interopRequireDefault(_winston);

class AuthController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await _user2.default.findOne({ email });
    if (!user) {
      _winston2.default.warn(`IP:${req.ip} Failed to find email`);
      return res.status(400).json({ error: "Credentials do not match" });
    }

    if (user.deleted === true) {
      _winston2.default.error(`IP:${req.ip} Disabled User`);
      return res.status(401).json({ error: "Disabled User" });
    }

    const checkPassword = await _bcryptjs2.default.compare(password, user.password);

    if (!checkPassword) {
      _winston2.default.warn(`IP:${req.ip} Password do not match`);
      return res.status(400).json({ error: "Credentials do not match" });
    }

    const { secret, expiresIn } = _jwt2.default;

    const token = _jsonwebtoken2.default.sign({}, secret, {
      subject: String(user._id),
      expiresIn,
    });
    _winston2.default.info(`IP:${req.ip} Login Success User:${user}`);
    return res.json({ user: user.show(), token });
  }
}
exports. default = new AuthController();
