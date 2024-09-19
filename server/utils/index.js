/**
 * @param fieldName String | The field name of the array of objects
 * @returns Array | Array of values of the provided filed name
 */
Array.prototype.dataCollector = function(key) {
  let data = []
  const result = this.forEach(item => {
    return data.push(item[key])
  });
  return data;
}