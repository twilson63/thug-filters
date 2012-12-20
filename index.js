var validator = require('validator');
var uuid = require('node-uuid');
// in filters
exports.blacklist = function(fields) {
  return function(obj, next){
    fields.forEach(function(field) {
      delete obj[field];
    });
    next(obj)
  }
}

// in filters
exports.whitelist = function(fields) {
  return function(obj, next){
    for (var prop in obj) {
      if (fields.indexOf(prop) === -1 || obj[prop] === null) {
        delete obj[prop];
      }
    }
    next(obj);
  }
}

exports.include = function(field, defaultValue) {
  return function(doc, next) {
    doc[field] = doc[field] || defaultValue;
    next(doc);
  }
}

exports.sanitize = function(field) {
  return function(doc, next) {
    doc[field] = validator.sanitize(doc[field]).xss().replace(/\[removed\]/g,' ').trim();
    next(doc); 
  }
}

exports.uuid = function(field) {
  return function(doc, next) {
    if (!doc[field]) {
      doc[field] = uuid.v4();
    }
    next(doc);
  }
}