import express from 'express';
import './database';
import routes from './routes';
import helmet from 'helmet';
import cors from 'cors';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    //security
    this.server.use(helmet());
    //domains to frontend
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
