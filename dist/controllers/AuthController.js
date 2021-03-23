"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _jwt = require('../config/jwt'); var _jwt2 = _interopRequireDefault(_jwt);

class AuthController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await _user2.default.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Credentials do not match' });
    }

    if (user.deleted === true) {
      return res.status(401).json({ error: 'Disabled User' });
    }

    const checkPassword = await _bcryptjs2.default.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({ error: 'Credentials do not match' });
    }

    const { secret, expiresIn } = _jwt2.default;

    const token = _jsonwebtoken2.default.sign({}, secret, {
      subject: String(user._id),
      expiresIn,
    });
    return res.json({ user: user.show(), token });
  }
}
exports. default = new AuthController();
