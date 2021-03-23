"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);
var _datefns = require('date-fns');
var _Mail = require('../helpers/Mail'); var _Mail2 = _interopRequireDefault(_Mail);
var _mail = require('../config/mail'); var _mail2 = _interopRequireDefault(_mail);

class RecoveryController {
  async store(req, res) {
    const { email } = req.body;
    const user = await _user2.default.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User does not found' });
    }
    const token = await _crypto2.default.randomBytes(8).toString('hex');
    const exp = _datefns.addMinutes.call(void 0, new Date(), 5);

    user.token = token;
    user.expiration = exp;

    _Mail2.default.sendMail({
      from: _mail2.default.from,
      to: user.email,
      subject: 'Recuperação de senha',
      template: 'recovery',
      context: {
        token: user.token,
      },
    });

    await user.save();

    return res.status(200).send();
  }

  async update(req, res) {
    const { token, password } = req.body;

    const user = await _user2.default.findOne({ token });
    if (_datefns.isAfter.call(void 0, new Date(), user.expiration)) {
      return res.status(400).json({ error: 'Token expired' });
    }

    user.password = password;
    user.token = null;
    user.expiration = null;
    await user.save();

    return res.status(200).send();
  }
}

exports. default = new RecoveryController();
