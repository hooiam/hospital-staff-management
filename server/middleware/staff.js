'use strict'

const Exception = require('../utils/exception')

/**
 * Function to sanitize the request body before passing to controller
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.sanitizeStaffReq = async(req, res, next) => {
  try {
    const { name, roleId, contact} = req.body;
    // Validation errors
    if (!name || !roleId || !contact) {
      throw new Exception('Name, role and contact are required', 400)
    }
    // Validating contact as number and having 10 digits
    if(!contact.checkIntegerDigits()) throw new Exception('Invalid contact number. It must have 10 digits', 400)
    // All OK  
    next()
  } catch(error) {
    console.log(error)
    next(error)
  }    
}
