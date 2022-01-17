"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _readOnlyError2 = _interopRequireDefault(require("@babel/runtime/helpers/readOnlyError"));

var Sequelize = require('sequelize');

var pkg = require('../../../package.json'); // set db name to package name 


var dbName = pkg.name + (process.env.NODE_ENV === 'test' ? '_test' : ''); // db config for logging and Heroku

var config = {
  logging: false,
  operatorsAliases: false
};

if (process.env.DATABASE_URL) {
  ({
    logging: false,
    operatorsAliases: false,
    dialect: "postgres",
    protocol: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }), (0, _readOnlyError2["default"])("config");
}

;

if (process.env.LOGGING === 'true') {
  delete config.logging;
}

;
var db = new Sequelize(process.env.DATABASE_URL || "postgres://localhost:5432/".concat(dbName), config);
module.exports = db;