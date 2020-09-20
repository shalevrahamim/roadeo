const cls = require('cls-hooked');
const _ = require('lodash');
const { createWinstonLogger } = require('./lib/winstonLogger');
const sanitier = require('./lib/sanitizer');
const { levels } = require('./lib/loggerLevels');

/**
 *
 * @param {Logger} logger - an instance of Logger
 * @param {string} serviceName
 * @returns {Object} - The namespace, if exists, or an empty object otherwise
 */
const getContextParams = ({ logger, serviceName }) => {
  const ns = cls.getNamespace(serviceName);
  if (ns && ns.active) {
    try {
      return ns.get('contextParams') || {};
    } catch (error) {
      logger.error('[LOGGER SETUP] Error getting context pararms', { error });
    }
  }

  return {};
};

/**
 *
 * @param {boolean} sendEventOnError - the default value defined upon logger instantiation
 * @param {string} level - log level (e.g. 'info', 'error', etc.)
 * @param {boolean} [SendThisLogEvent] - this param's value will override the default sendEventOnError. If undefined - sendEventOnError's value will prevail
 * @returns {boolean}
 */
const shouldSendEventToTransports = ({
  sendEventOnError,
  level,
  sendThisLogEvent,
}) => {
  return (
    (sendEventOnError &&
      level === levels.ERROR &&
      sendThisLogEvent !== false) ||
    !sendThisLogEvent
  );
};

/**
 *
 * @param {string} level - log level (e.g. 'info', 'error', etc.)
 * @param {Logger} logger - an instance of Logger
 * @param {string} serviceName
 * @param {string[]} [defaultFieldsToSanitize] - An array of field-names to sanitize in the log
 * @param {string[]} [defaultFieldsToRemove] - An array of field-names to remove from the log
 * @param {boolean} [sendEventOnError] - Send an event to transport 3rd party on error
 * @returns {function(string, Object, Object)} - A function that receives a log message, relevant log parameters, and options (for specific logging cases).
 */
const handleLogMessage = ({
  level,
  logger,
  serviceName,
  defaultFieldsToSanitize,
  defaultFieldsToRemove,
  sendEventOnError,
}) => (
  message,
  params = {},
  options = { fieldToSanitize: [], fieldsToRemove: [], sendEvent: undefined }
) => {
  let error;

  _.map(params, (param) => {
    if (param instanceof Error) {
      error = { kind: param.name, message: param.message, stack: param.stack };
      return param;
    }

    return param;
  });

  const pureParams = _.omitBy(params, _.isError);

  const allFieldsToSanitize = defaultFieldsToSanitize.concat(
    options.fieldsToSanitize
  );
  const allFieldsToRemove = defaultFieldsToRemove.concat(
    options.fieldsToRemove
  );

  const sanitizedParams = sanitier({
    meta: { ...pureParams, ...getContextParams({ logger, serviceName }) },
    fieldsToSanitize: allFieldsToSanitize,
    fieldsToRemove: allFieldsToRemove,
  });

  const eventData = {
    level,
    message,
  };

  logger.log({
    ...eventData,
    ...sanitizedParams,
    error,
  });

  const shouldSendEvent = shouldSendEventToTransports({
    sendEventOnError,
    level,
    sendThisLogEvent: options.sendEvent,
  });
  if (shouldSendEvent) {
    // TODO: Future forward to 3rd party transport.
  }
};

class Logger {
  /**
   *
   * @param {string} serviceName
   * @param {object} [transports] - Enabled Transports
   * @param {boolean} [enableConsole] - Send log to console
   * @param {boolean} [prettyConsole] - Send log to Pretty-Print console
   * @param {Array} [transportOverrides] - Your custom transports, should you choose to send logs to them
   * @param {string[]} [defaultFieldsToSanitize] - An array of field-names to sanitize in the log
   * @param {string[]} [defaultFieldsToRemove] - An array of field-names to remove from the log
   * @param {boolean} [handleExceptions] - Handle uncaughtExceptions (log them)
   * @param {boolean} [handleRejections] - Handle uncaughtPromiseRejections (log them)
   */
  constructor({
    serviceName,
    transports: { enableConsole = true, prettyConsole } = {},
    transportOverrides = [],
    defaultFieldsToSanitize = [],
    defaultFieldsToRemove = [],
    handleExceptions,
    handleRejections,
  } = {}) {
    this.logger = createWinstonLogger({
      serviceName,
      transports: { enableConsole, prettyConsole },
      transportOverrides,
      handleExceptions,
      handleRejections,
    });
    this.serviceName = serviceName;

    this.logger.on('error', (error) => {
      throw error;
    });

    Object.values(levels).forEach((level) => {
      this[level] = handleLogMessage({
        level,
        serviceName: this.serviceName,
        logger: this.logger,
        defaultFieldsToSanitize,
        defaultFieldsToRemove,
      });
    });
  }

  /**
   *
   * @param {Object} [contextParams] - parameters that will appear in all the request-logs within a certain context
   * @param {Function} next - next middleware
   */
  initLoggingContext({ contextParams = {}, next }) {
    let ns = cls.getNamespace(this.serviceName);
    if (!ns) ns = cls.createNamespace(this.serviceName);

    let error;

    try {
      ns.run(() => {
        try {
          // save reqeust info in the context params
          ns.set('contextParams', {
            env: process.env.NODE_ENV,
            host: process.env.HOSTNAME,
            ...contextParams,
          });
        } catch (erorr) {
          this.logger.error('[LOGGER SETUP] Error setting context params', {
            contextParams,
            error,
          });
          error = error;
        }
        try {
          next(error);
        } catch (errorFromNext) {
          errorFromNext.isRelatedToNextFn = true;
          throw errorfromNext;
        }
      });
    } catch (error) {
      if (error.isRelatedToNextFn) throw error;

      this.logger.error('[LOGGER SETUP] Error initializing namespace', {
        contextParams,
        error,
      });

      next(error);
    }
  }

  /**
   *
   * @param {Object} addedParams - extra parameters to add to a context
   */
  addToContext(addedParams) {
    const ns = cls.getNamespace(this.serviceName);
    if (ns && ns.active) {
      try {
        const currentParams = ns.get('contextParams');
        ns.set('contextParams', {
          ...currentParams,
          addedParams,
        });
      } catch (error) {
        this.logger.error('[LOGGER SETUP] Error adding parameter to context', {
          adddedParams,
          error,
        });
      }
    }
  }

  /**
   * When running tests, initDefaultLogger doesn't run in index.js, so the following method is used
   * make sure that the logger won't be undefined in the test environment
   */
  static get defaultLogger() {
    if (!this.standardLogger) {
      this.initDefaultLogger({
        serviceName: `{process.env.NODE_ENV}-DefaultLogger`,
      });
    }

    return this.standardLogger;
  }

  // Same options as the constructor
  static initDefaultLogger(options) {
    this.standardLogger = new Logger(options);
  }
}

module.exports = Logger;
