'use strict'

const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  const secretKey = 'fiftyfive'; 

  const token = jwt.sign(payload, secretKey);
  return token;
};

module.exports = generateToken