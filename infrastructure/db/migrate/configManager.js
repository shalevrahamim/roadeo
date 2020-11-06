const fs = require('fs');
const { getConnectionString } = require('../index');

async function initConfig() {
  const databaseUrl = getConnectionString();

  const configJSON = {
    [process.env.NODE_ENV]: {
      url: databaseUrl,
      dialect: 'postgres',
    },
  };

  if (process.env.DB_SCHEMA) {
    configJSON[process.env.NODE_ENV].migrationStorageTableSchema =
      process.env.DB_SCHEMA;
  }

  fs.mkdirSync('config');
  fs.writeFileSync('config/config.json', JSON.stringify(configJSON));
}

function deleteConfig() {
  fs.unlinkSync('config/config.json');
  fs.rmdirSync('config');
}

module.exports = { initConfig, deleteConfig };
