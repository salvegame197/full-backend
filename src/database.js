import mongoose from "mongoose";
import logger from "./config/winston";

class Database {
  constructor() {
    this.init();
  }

  init() {
    mongoose.connect(
      `${process.env.MONGODB_CONNECT}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      (err) => {
        if (err) {
          logger.error(`MongoDB not Connected: ${err}`);
        } else {
          logger.info(`MongoDB Connected`);
        }
      }
    );
  }
}

export default new Database();
