const winston = require('winston');

const { combine, timestamp, json, label, prettyPrint } = winston.format;

const createWinstonLogger = ({
  serviceName,
  transports: { enableConsole = true, prettyConsole } = {},
  transportOverrides = [],
  handleExceptions = true,
  handleRejections = true,
}) => {
  const transports = [...transportOverrides];
  if (enableConsole) {
    if (prettyConsole) {
      transports.push(
        new winston.transports.Console({
          format: combine(
            label({ label: serviceName }),
            prettyPrint({ colorize: true, depth: 4 })
          ),
        })
      );
    } else {
      transports.push(
        new winston.transports.Console({
          format: combine(label({ label: serviceName }), json()),
        })
      );
    }
  }

  const addHostname = winston.format((info) => {
    return { ...info, host: process.env.HOSTNAME };
  });

  const logger = winston.createLogger({
    format: combine(addHostname(), timestamp()),
    transports,
    exceptionHandlers: handleExceptions && transports,
    rejectionHandlers: handleRejections && transports,
  });

  return logger;
};

module.exports = { createWinstonLogger };
