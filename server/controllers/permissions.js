'use strict'

const { Permission } = require('../models')

/**
 * Function to get all roles
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getPermissions = async (req, res, next) => {
  try {
    // TODO: Implement pagination
    const permissions = await Permission.findAll()
    res.status(200).json({message: "Permissions fetched successfully", data: permissions}) 
  } catch(error) {
    console.log(error)
    next(error)
  }
}
