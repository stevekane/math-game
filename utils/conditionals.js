exports.isFalse = function (value) {
  return (value === "" || value === undefined || value === null);
};

exports.isTrue = function (value) {
  return (value !== "" && value !== undefined && value !== null);
};
