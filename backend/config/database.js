const Sequelize = require("sequelize");
const dbconfig = require("./dbconfig");

const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
  host: dbconfig.HOST,
  dialect: dbconfig.dialect,
});

// const DEFAULT_DIALECT = 'postgres'; // Set a default dialect
// const dialect = process.env.DB_DIALECT || DEFAULT_DIALECT;

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: dialect,
// });


module.exports = sequelize;
