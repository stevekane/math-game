var throwIf = require('./../utils/exceptions').throwIf
  , isFalse = require('./../utils/conditionals').isFalse;

var GameState = function (name, game) {
  throwIf("must provide a name!", isFalse(name));
  this.name = name;
  this.game = game;
};

GameState.prototype = Object.create({});

module.exports = GameState;
