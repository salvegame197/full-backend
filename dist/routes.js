"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('./controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _AuthController = require('./controllers/AuthController'); var _AuthController2 = _interopRequireDefault(_AuthController);
var _checkCredentials = require('./middlewares/checkCredentials'); var _checkCredentials2 = _interopRequireDefault(_checkCredentials);
var _RecoveryController = require('./controllers/RecoveryController'); var _RecoveryController2 = _interopRequireDefault(_RecoveryController);

const routes = new (0, _express.Router)();

routes.post('/users', _UserController2.default.store);
routes.post('/auth', _AuthController2.default.store);
routes.post('/recovery', _RecoveryController2.default.store);
routes.put('/recovery', _RecoveryController2.default.update);

routes.get('/users', _checkCredentials2.default, _UserController2.default.show);
routes.put('/users', _checkCredentials2.default, _UserController2.default.update);
routes.delete('/users', _checkCredentials2.default, _UserController2.default.deleted);

exports. default = routes;
