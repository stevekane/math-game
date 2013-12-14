var _ = require('lodash')
  , throwUnless = require('power-throw').throwUnless;

var GameState = function (name) {
  throwUnless(
    "must provide a name!", 
    typeof name === "string" && name !== ""
  );
  this.name = name;
};

GameState.prototype = Object.create({});

module.exports = GameState;
