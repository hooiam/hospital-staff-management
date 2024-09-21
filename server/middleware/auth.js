'use strict'

const jwt = require('jsonwebtoken');
const generateToken = require('../utils/auth');
const Exception = require('../utils/exception')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.authorizer = async(req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) throw new Exception('Invalid requrest. Missing token', 400)      
    
    const token = authHeader.split(' ')[1]
    jwt.verify(token, 'fiftyfive', (err, payload) => {
      if (err) {
        throw new Exception('Invalid token!', 403)
      } else {
        req.user = payload
        next()
      }
    })
  } catch(error) {
    console.log(error)
    next(error)
  }  
}

/**
 * Authorizer middleware to allow certain routes for admin
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.adminAuthorizer = async (req, res, next) => {
  try {
    const { user } = req
    if(user.userType !== 'admin') throw new Exception("Access denied! Please contact to administrator", 403)
    next()
  } catch (error) {
    console.log(error)
    next(error)
  }
}