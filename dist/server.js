"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _env = require('./config/env'); var _env2 = _interopRequireDefault(_env);
var _winstonjs = require('./config/winston.js'); var _winstonjs2 = _interopRequireDefault(_winstonjs);
var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

_app2.default.listen(3001, () => {
  _winstonjs2.default.info(`Server.js API Started`);
});
