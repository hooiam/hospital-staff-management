'use strict'

/**
 * @param {String} key The field name of the array of objects
 * @returns {Array} Array of values of the provided filed name
 */
Array.prototype.dataCollector = function(key) {
  let data = []
  const result = this.forEach(item => {
    return data.push(item[key])
  });
  return data;
}

/**
 * Function to check if a given number is an interger and it has exactly specified digits
 * @param {Interger} digit Expected digits to be there in a number
 * @returns {Boolean}
 */
String.prototype.checkIntegerDigits = function(digit = 10) {
  const regex = new RegExp(`^\\d{${digit}}$`)
  if (!regex.test(+this)) return false
  return true
}
