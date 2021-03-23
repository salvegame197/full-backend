"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

class Database {
  constructor() {
    this.init();
  }

  init() {
    _mongoose2.default.connect(
      `${process.env.MONGODB_CONNECT}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      () => {
        console.log('MongoDB Connected');
      }
    );
  }
}

exports. default = new Database();
