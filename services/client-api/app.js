const express = require('express');
const { postgraphile } = require('postgraphile');
const { getConnectionString } = require('../../infrastructure/db');
const setupRoutes = require('./routes');

const app = express();

app.use(
  postgraphile(process.env.DATABASE_URL || getConnectionString(), {
    graphql: true,
    graphiql: true,
    graphiqlRoute: '/graphiql',
    dynamicJson: true,
    ignoreRBAC: false,
    enhanceGraphiql: true,
    graphileBuildOptions: {
      connectionFilterRelations: true, // default: false
      pgDeletedColumnName: 'deletedAt', // non-boolean column -> checked as "IS NULL"
    },
  })
);

module.exports = () => {
  setupRoutes(app);

  return app;
};
