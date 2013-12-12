exports.throwIf = function (message, condition) {
  if (!!condition) {
    throw new Error(message); 
  }
}

exports.throwUnless = function (message, condition) {
  if (!condition) {
    throw new Error(message); 
  }
}
