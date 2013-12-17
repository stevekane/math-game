var _ = require('lodash')
  , GameState = require('./../../modules/game/GameState');

var DisplayingAnswer = function (name) {
  this.name = name || "displaying-answer";
  this.duration = 2000;
};

DisplayingAnswer.prototype = Object.create(GameState.prototype);

_.extend(DisplayingAnswer.prototype, {
  
  //called every 100ms by the game system
  tick: function () {
    if (this.game.clock.getElapsed() > this.duration) {
      this.game.transitionTo("collecting-answers");   
    }
  },

  enter: function (answer) {
    var self = this
      , now = Date.now();

    this.game.clock.startTime = now;
    this.game.clock.timeStamp = now;
    this.game.room.messageMembers("answer", answer);
  },

  exit: function () {
    console.log("You are no longer displaying the answer");  
  }
});

module.exports = DisplayingAnswer;
