'use strict'

const logger = require('../utils/logger')

/**
 * Logger function to track all user activities
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const activityLogger = (req, res, next) => {
  try {
    const { method, originalUrl, body, user } = req
    const userId = user ? user.id : 'anonymous'
    const userType = user ? user.type : 'anonymous'
    const userName = user ? user.name : 'anonymous'
    // filtering sensitive information like password from request body for logging
    const {password, ...filteredBody} = body

    if (method !== 'GET') {
      logger.info({
        userId: userId,
        userName: userName,
        userType: userType,
        action: method + ' ' + originalUrl,
        requestData: filteredBody,
        timestamp: new Date().toISOString(),
      });
    }

    next()
  } catch (error) {
    console.log(error)
    next(error)
  }
  
}

module.exports = activityLogger;