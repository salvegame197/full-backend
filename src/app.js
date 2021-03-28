import express from "express";
import "./database";
import routes from "./routes";
import helmet from "helmet";
import cors from "cors";

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
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    //security
    this.server.use(helmet());
    //domains to frontend
    this.server.use(cors(corsOptions));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
