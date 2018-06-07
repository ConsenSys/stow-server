const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

const name = process.env.LINNIA_DB_NAME;
const user = process.env.LINNIA_DB_USERNAME;
const password = process.env.LINNIA_DB_PASSWORD;
const host = process.env.LINNIA_DB_HOST || 'localhost';
const port = process.env.LINNIA_DB_PORT || 5432;
const dialect = 'postgres';

const sequelize = new Sequelize(name, user, password, {
  host,
  port,
  dialect
});

let models = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model;
  });

Object.keys(models).forEach(function(modelName) {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

sequelize.sync();

models.sequelize = sequelize;

module.exports = models;
