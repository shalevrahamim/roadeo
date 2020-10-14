const {
  initDb,
  models,
  getSequelize,
  getConnectionString,
} = require('../../../infrastructure/db');

console.log(getSequelize());
