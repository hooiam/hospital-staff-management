const fs = require('fs');

module.exports = {
  development: {
    username: process.env.MYSQL_USER || 'admin',
    password: process.env.MYSQL_PASSWORD || 'admin',
    database: process.env.MYSQL_DATABASE || 'hsm',
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  }
}