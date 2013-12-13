var _ = require('lodash')
  , GameState = require('./../game/GameState');

var Waiting = function (name) {
  this.name = name || "waiting";
};

Waiting.prototype = Object.create(GameState.prototype);

_.extend(Waiting.prototype, {

  tick: function () {
    if (this.game.room.getMembers().length > 0) {
      this.game.transitionTo('collecting-answers'); 
    }
  },

  /**
  These are functions invoked by state change. 
  */
});

module.exports = Waiting;
