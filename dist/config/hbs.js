"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _expresshandlebars = require('express-handlebars'); var _expresshandlebars2 = _interopRequireDefault(_expresshandlebars);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

const viewPath = _path2.default.resolve(__dirname, '..', 'views', 'emails');
exports. default = {
  viewEngine: _expresshandlebars2.default.create({
    layoutsDir: viewPath,
    partialsDir: _path2.default.resolve(viewPath, 'partials'),
    defaultLayout: 'default',
    extname: '.hbs',
  }),
  viewPath,
  extName: '.hbs',
};
