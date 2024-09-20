'use strict'

/**
 * Extension of Error class to set a status code
 */
class Exception extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = Exception