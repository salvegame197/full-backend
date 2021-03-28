"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
require('./database');
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);

const whiteList = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not alloewd by CORS"));
    }
  },
};

class App {
  constructor() {
    this.server = _express2.default.call(void 0, );

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(_express2.default.json());
    //security
    this.server.use(_helmet2.default.call(void 0, ));
    //domains to frontend
    this.server.use(_cors2.default.call(void 0, corsOptions));
  }

  routes() {
    this.server.use(_routes2.default);
  }
}

exports. default = new App().server;
