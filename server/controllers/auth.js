'use strict'

const { Staff } = require('../models')
const generateToken = require('../utils/auth');
const Exception = require('../utils/exception');
const adminConfig = require('../config/admin.json')

/**
 * Function to login admin or staff based on their special credentials
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.login = async (req, res, next) => {
  try {
    const { password } = req.body;
    let user = {}
    // admin login
    if(password === adminConfig.password) {
      user = {
        id: adminConfig.id,
        name: adminConfig.name,
        userType: adminConfig.userType,
      }
    } else { // staff login
      const staff = await Staff.findOne({ where: { contact: password } })
      if (staff === null) throw new Exception("Login failed! Please enter correct password", 403)
      user = {
        id: staff.id,
        name: staff.name,
        userType: "staff"
      }
    }
    const token = generateToken(user);
    res.status(200).json({
      message: 'Login successful',
      data: token
    });
  } catch (error) {
    console.log(error)
    next(error)
  }
}