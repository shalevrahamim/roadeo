const express = require('express');
const { postgraphile } = require('postgraphile');
const { getConnectionString } = require('../../infrastructure/db');
const setupRoutes = require('./routes');

const app = express();

app.use(
  postgraphile(process.env.DATABASE_URL || getConnectionString(), {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
  })
);

module.exports = () => {
  setupRoutes(app);

  return app;
};
