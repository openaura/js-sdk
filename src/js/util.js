/*global require, module */
function getProp(obj, propName) {
  var propAr  = propName.split("."),
      head    = propAr.shift(),
      tailStr = propAr.join(".");

  if (typeof obj != 'undefined' && obj != null && 
      obj.hasOwnProperty(head) && typeof obj[head] != 'undefined' && 
      obj[head] != null) {
    if (propAr.length)
      return getProp(obj[head], tailStr);
    else
      return obj[head];
  } else {
    return null;
  }
}
  
module.exports = {
  getProperty: getProp
};
