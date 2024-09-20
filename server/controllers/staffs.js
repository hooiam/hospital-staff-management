'use strict'

const { Staff } = require('../models')
const Exception = require('../utils/exception')

/**
 * Function to create a staff record
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createStaff = async(req, res, next) => {
  try {    
    console.log("Iam here")
    const { name, roleId, department, jobTitle, contact} = req.body;
    // create a new staff record
    const newStaff = await Staff.create({
      name,
      roleId,
      department,
      jobTitle,
      contact
    });

    res.status(201).json({
      message: 'Staff record created successfully',
      data: newStaff
    });
  } catch (error) {
    console.log("error controller", error)
    next(error)
  }
}

/**
 * Function to get all staff records
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */ 
exports.getStaffs = async(req, res, next) => {
  try {
    // TODO: Implement pagination
    const staffs = await Staff.findAll()
    res.status(200).json({message: "Staff records fetched successfully", data: staffs}) 
  } catch(error) {
    console.log(error)
    next(error)
  }
}

/**
 * Function to update a staff record
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updateStaff = async(req, res, next) => {
  try {
    const { name, roleId, department, jobTitle, contact} = req.body;

    const [updateRowCount] = await Staff.update(
      {
        name,
        roleId,
        department,
        jobTitle,
        contact
      }, 
      {
        where: {
          id: req.params.id
        }
      }
    );

    if(updateRowCount === 0) {
      throw new Exception("Invalid request ! Could not find any record to update", 400)
    } else {
      res.status(200).json({message: "Staff record updated successfully"}) 
    }    
  } catch (error) {
    console.log(error)
    next(error)
  }
}

/**
 * Function to delete a staff by it's ID
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteStaff = async(req, res, next) => {
  try {
    const deleteRowCount = await Staff.destroy({
      where: {
        id: req.params.id
      },
    });
    if(deleteRowCount === 0) {
      throw new Exception("Invalid request ! Could not find any record to delete", 400)
    } else {
      res.status(200).json({message: "Staff record deleted successfully"}) 
    }
  } catch(error) {
    console.log(error)
    next(error)
  }
}