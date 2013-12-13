var throwIf = require('./../utils/exceptions').throwIf
  , isFalse = require('./../utils/conditionals').isFalse;

var GameState = function (name) {
  throwIf("must provide a name!", isFalse(name));
  this.name = name;
};

GameState.prototype = Object.create({});

module.exports = GameState;
