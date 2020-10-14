const { readdirSync } = require('fs');
const { join } = require('path');
const Sequelize = require('sequelize');

const models = {};
let sequelize;

const getConnectionString = () => {
  if (['test', 'development'].includes(process.env.NODE_ENV)) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL env var is missing.');
    }

    return process.env.DATABASE_URL;
  }
  return process.env.POSTGRES;
};

// Sequelize init function
const init = (databaseUrl) => {
  sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    logging: process.env.SEQUELIZE_LOGGING
      ? process.env.SEQUELIZE_LOGGING === 'true'
      : true,
    operatorsAliases: 0,
    define: { rejectOnEmpty: true },
  });

  // set Op to support sequelize v5
  sequelize.Op = Sequelize.Op;

  readdirSync(join(__dirname, 'models'))
    .filter((file) => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
    .forEach((file) => {
      const model = sequelize.import(join(__dirname, 'models', file));
      models[model.name] = model;
    });

  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });
};

// Init quickly for developing
if (!sequelize && ['development', 'test'].includes(process.env.NODE_ENV)) {
  init(getConnectionString());
}

const initDb = async () => {
  // Initialize only once
  if (sequelize) return;

  console.log('Initializing Sequelize');
  const settings = process.env.POSTGRES;
  init(settings);
  console.log('Sequelize is ready');
};

const getSequelize = () => sequelize;

module.exports = { initDb, models, getSequelize, getConnectionString };
