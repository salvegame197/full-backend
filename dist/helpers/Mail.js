"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _nodemailer = require('nodemailer'); var _nodemailer2 = _interopRequireDefault(_nodemailer);
var _nodemailerexpresshandlebars = require('nodemailer-express-handlebars'); var _nodemailerexpresshandlebars2 = _interopRequireDefault(_nodemailerexpresshandlebars);
var _mail = require('../config/mail'); var _mail2 = _interopRequireDefault(_mail);
var _hbs = require('../config/hbs'); var _hbs2 = _interopRequireDefault(_hbs);

class Mail {
  constructor() {
    const { host, port, secure, auth } = _mail2.default;
    this.transporter = _nodemailer2.default.createTransport({
      host,
      port,
      secure,
      auth,
    });

    this.configureTemplates();
  }

  configureTemplates() {
    this.transporter.use('compile', _nodemailerexpresshandlebars2.default.call(void 0, _hbs2.default));
  }

  sendMail(data) {
    this.transporter.sendMail(data);
  }
}

exports. default = new Mail();
