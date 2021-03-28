import _ from "./config/env";
import logger from "./config/winston.js";
import app from "./app";

app.listen(3001, () => {
  logger.info(`Server.js API Started`);
});
