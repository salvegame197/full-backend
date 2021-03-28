"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _winston = require('winston'); var _winston2 = _interopRequireDefault(_winston);
const { combine, timestamp, label, printf } = _winston2.default.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
const logger = _winston2.default.createLogger({
  level: process.env.WINSTON_LEVEL,
  transports: [
    new _winston2.default.transports.Console(),
    new _winston2.default.transports.File({ filename: `${process.env.API_NAME}.log` }),
  ],
  format: combine(
    label({ label: process.env.API_NAME }),
    timestamp(),
    myFormat
  ),
});

exports. default = logger;
