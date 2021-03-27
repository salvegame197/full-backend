import winston from "winston";
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
const logger = winston.createLogger({
  level: process.env.WINSTON_LEVEL,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `${process.env.API_NAME}.log` }),
  ],
  format: combine(
    label({ label: process.env.API_NAME }),
    timestamp(),
    myFormat
  ),
});

export default logger;
