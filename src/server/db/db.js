const Sequelize = require('sequelize');
const pkg = require('../../../package.json');

// set db name to package name 
const dbName = pkg.name + (process.env.NODE_ENV === 'test' ? '_test' : '')

// db config for logging and Heroku
const config = {
    logging: false,
    operatorsAliases: false,
};
if (process.env.DATABASE_URL) {
  config = {
    logging: false,
    operatorsAliases: false,
    dialect: "postgres",
    protocol: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
};
if (process.env.LOGGING === 'true') {
    delete config.logging
};

const db = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`, config);
module.exports = db;
