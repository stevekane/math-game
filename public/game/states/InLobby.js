var _ = require('lodash')
  , GameState = require('./../../../modules/game/GameState');

var InLobby = function (name) {
  this.name = name || "in-lobby";
};

InLobby.prototype = Object.create(GameState.prototype);

_.extend(InLobby.prototype, {

  enter: function () {
    console.log("you are in the lobby..."); 
  }, 
});

module.exports = InLobby;
