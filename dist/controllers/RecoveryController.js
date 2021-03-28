"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);
var _datefns = require('date-fns');
var _Mail = require('../helpers/Mail'); var _Mail2 = _interopRequireDefault(_Mail);
var _mail = require('../config/mail'); var _mail2 = _interopRequireDefault(_mail);
var _winston = require('../config/winston'); var _winston2 = _interopRequireDefault(_winston);

class RecoveryController {
  async store(req, res) {
    try {
      const { email } = req.body;
      const user = await _user2.default.findOne({ email });

      if (!user) {
        _winston2.default.warn(
          `IP:${req.ip} POST/recevory user does not found : ${email}`
        );
        return res.status(400).json({ error: "User does not found" });
      }
      const token = await _crypto2.default.randomBytes(8).toString("hex");
      const exp = _datefns.addMinutes.call(void 0, new Date(), 5);

      user.token = token;
      user.expiration = exp;

      _Mail2.default.sendMail({
        from: _mail2.default.from,
        to: user.email,
        subject: "Recuperação de senha",
        template: "recovery",
        context: {
          token: user.token,
        },
      });

      await user.save();
      _winston2.default.info(`IP:${req.ip} POST/recovery send mail to  : ${user.email}`);
      return res.status(200).send();
    } catch (error) {
      _winston2.default.error(`IP:${req.ip} POST/recovery : ${error}`);
      return res.status(400).json({ error: "Error to send email" });
    }
  }

  async update(req, res) {
    try {
      const { token, password } = req.body;

      const user = await _user2.default.findOne({ token });
      if (_datefns.isAfter.call(void 0, new Date(), user.expiration)) {
        _winston2.default.error(`IP:${req.ip} PUT/recovery Token expired ${token}`);
        return res.status(400).json({ error: "Token expired" });
      }

      user.password = password;
      user.token = null;
      user.expiration = null;
      await user.save();

      _winston2.default.info(`IP:${req.ip} PUT/recovery : ${user}`);
      return res.status(200).send();
    } catch (error) {
      _winston2.default.error(`IP:${req.ip} POST/recovery : ${error}`);
      return res.status(400).json({ error: "Error at update password" });
    }
  }
}

exports. default = new RecoveryController();
