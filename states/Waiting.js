var _ = require('lodash')
  , GameState = require('./../game/GameState');

var Waiting = function (name) {
  this.name = name || "waiting";
};

Waiting.prototype = Object.create(GameState.prototype);

_.extend(Waiting.prototype, {
  enter: function () {
    var self = this;

    console.log("Waiting!"); 
    setTimeout(function () {
      self.game.transitionTo("collecting-answers");   
    }, 1000);
  },
  exit: function () {
    console.log("Waiting complete!");  
  }
});

module.exports = Waiting;
