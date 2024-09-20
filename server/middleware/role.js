'use strict'

const { Permission } = require('../models')
const utils = require('../utils')
const Exception = require('../utils/exception')

/**
 * Function to validate all permissions received into request body
 * @param {Array} requestedPermissions Permissoins received in request body
 * @returns Boolean
 */
const validatePermission = async(requestedPermissions) => {
  const allPermssions = await Permission.findAll({ attributes: ['name']})
  const allPermissionNames = allPermssions.dataCollector('name')
  return requestedPermissions.every(permission => allPermissionNames.includes(permission))
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.sanitizeRoleReq = async(req, res, next) => {
  try {
    const { name, permissions} = req.body;

    // Validation errors
    if (!name || !permissions || !Array.isArray(permissions) || permissions.length <= 0) {
      throw new Exception('Role name and permissions are required', 400)
    }
    // Validate permissions
    if(!await validatePermission(permissions)) throw new Exception('Invalid permissions', 400)
    // All OK  
    next()
  } catch(error) {
    console.log(error)
    next(error)
  }    
}
