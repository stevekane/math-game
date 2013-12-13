var _ = require('lodash')
  , GameState = require('./../game/GameState');

var DisplayingAnswer = function (name) {
  this.name = name || "displaying-answer";
};

DisplayingAnswer.prototype = Object.create(GameState.prototype);

_.extend(DisplayingAnswer.prototype, {
  enter: function () {
    var self = this;

    console.log("You are displaying the answer!"); 
    setTimeout(function () {
      self.game.transitionTo("collecting-answers");   
    }, 1000);
  },
  exit: function () {
    console.log("You are no longer displaying the answer");  
  }
});

module.exports = DisplayingAnswer;
