'use strict'

const { Role } = require('../models')
const Exception = require('../utils/exception')


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
    next(error)
  }
}

/**
 * Function to get all roles
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getRoles = async (req, res, next) => {
  try {
    // TODO: Implement pagination
    const roles = await Role.findAll()
    res.status(200).json({message: "Roles fetched successfully", data: roles}) 
  } catch(error) {
    console.log(error)
    next(error)
  }
}

/**
 * Function to update a role by it's ID
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updateRole = async(req, res, next) => {
  try {
    const { name, permissions} = req.body;

    const [updateRowCount] = await Role.update(
      { name, permissions: permissions.toString()},
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if(updateRowCount === 0) {
      throw new Exception("Invalid request ! Could not find any record to update", 400)
    } else {
      res.status(200).json({message: "Role updated successfully"}) 
    }
  } catch(error) {
    console.log(error)
    next(error)
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteRole = async(req, res, next) => {
  try {
    const deleteRowCount = await Role.destroy({
      where: {
        id: req.params.id
      },
    });
    if(deleteRowCount === 0) {
      throw new Exception("Invalid request ! Could not find any record to delete", 400)
    } else {
      res.status(200).json({message: "Role deleted successfully"}) 
    }
  } catch(error) {
    console.log(error)
    next(error)
  }
}
