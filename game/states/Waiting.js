var _ = require('lodash')
  , GameState = require('./../../modules/game/GameState');

var Waiting = function (name) {
  this.name = name || "waiting";
};

Waiting.prototype = Object.create(GameState.prototype);

_.extend(Waiting.prototype, {

  //tick function checks for players and joins collecting-answers  
  tick: function () {
    if (this.game.room.getMembers().length > 0) {
      this.game.transitionTo('collecting-answers'); 
    }
  },

  roomNotEmpty: function () {
    this.game.transitionTo('collecting-answers'); 
  },

  //FIXME: no-op...possibly remove or change transitionTo mechanics to be no-op
  //if targetState is same as activeState
  roomIsEmpty: function () {},

  /**
  These are functions invoked by state change. 
  */
  enter: function () {
    console.log('waiting for players...'); 
  },
});

module.exports = Waiting;
