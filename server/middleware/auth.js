'use strict'

const jwt = require('jsonwebtoken');
const generateToken = require('../utils/auth');
const Exception = require('../utils/exception')
const {Staff} = require('../models')

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
    const { method, user } = req
    // Allowing fetch roles for everyone. Adming is allow to access other roles
    if(user.type !== 'admin' && method !== 'GET') throw new Exception("Access denied! Please contact to administrator", 403)
    next()
  } catch (error) {
    console.log(error)
    next(error)
  }
}

/**
 * Function to check user's permission and allow / disallow the request 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.can = async (req, res, next) => {
  try {
    const { method, user } = req
    // TODO: Refactor needed. Permissions should be fetched dynamically
    const methodPermissionMapping = {
      GET: "list",
      POST: "create",
      PUT: "update",
      DELETE: "delete"
    }
    if(user.type === 'admin') {
      next()
    } else {
      const staff = await Staff.findByPk(user.id, {include: 'role'})
      if(staff === null) throw new Exception('Invalid user ! please contact with administrator')
      console.log(staff.role.permissions)
      const permissions = staff.role.permissions
      if(permissions.includes(methodPermissionMapping[method])) {
        next()
      } else {
        throw new Exception("You don't permission to access this resouce", 403)
      }
    }    
  } catch (error) {
    next(error)
  }
}