const getTimestamp = () => new Date().toUTCString();

const logger = {
  error(message, error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`ERR:${getTimestamp()}: `, message, error);
    }
  },
  warn(...args) {
    console.warn(`WRN:${getTimestamp()}: `, ...args);
  },
  log(...args) {
    console.log(`LOG:${getTimestamp()}: `, ...args);
  },
};

module.exports = { logger };
