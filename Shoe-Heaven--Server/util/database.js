const { Sequelize, Model } = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  { dialect: "mysql", host: "localhost" }
);

module.exports = sequelize;
