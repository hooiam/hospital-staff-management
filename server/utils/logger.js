'use strict'

const { createLogger, transports, format } = require('winston')

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'logs/activities.log', level: 'info' })
  ],
});

module.exports = logger
