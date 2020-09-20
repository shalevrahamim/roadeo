const express = require('express');
const setupRoutes = require('./routes');

const app = express();

module.exports = () => {
  setupRoutes(app);

  return app;
};
