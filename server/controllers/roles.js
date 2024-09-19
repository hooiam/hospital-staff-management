'use strict'

const { Role, Permission } = require('../models')
const utils = require('../utils')

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
 * Function to create a new role
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.createRole = async (req, res, next) => {
  try {
    const { name, permissions} = req.body;

    // Validation errors
    if (!name || !permissions || !Array.isArray(permissions) || permissions.length <= 0) {
      return res.status(400).json({ message: 'Role name and permissions are required', error: "Bad request" });
    }
    // Validate permissions
    if(!validatePermission(permissions)) return res.status(400).json({ message: 'Invalid permissions', error: "Bad request" });

    const newRole = await Role.create({
      name,
      permissions: permissions.toString()
    });

    res.status(201).json({
      message: 'Role created successfully',
      data: newRole
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Failed to create role record',
      error: error.message
    });
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getRoles = (req, res, next) => {

}

exports.updateRole = (req, res, next) => {

}

exports.deleteRole = (req, res, next) => {

}