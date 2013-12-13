var _ = require('lodash')
  , GameState = require('./../game/GameState');

var CollectingAnswers = function (name) {
  this.name = name || "collecting-answers";
};

CollectingAnswers.prototype = Object.create(GameState.prototype);

_.extend(CollectingAnswers.prototype, {
  enter: function () {
    var self = this;

    console.log("You are collecting answers!"); 
    setTimeout(function () {
      self.game.transitionTo("displaying-answer");   
    }, 1000);
  },
  exit: function () {
    console.log("You are no longer collecting answers");  
  }
});

module.exports = CollectingAnswers;
