var _ = require('lodash')
  , GameState = require('./../game/GameState');

var Initializing = function (name) {
  this.name = name || "initializing";
};

Initializing.prototype = Object.create(GameState.prototype);

_.extend(Initializing.prototype, {
  enter: function () {
    var self = this;

    console.log("Initializing!"); 
    setTimeout(function () {
      self.game.transitionTo("collecting-answers");   
    }, 1000);
  },
  exit: function () {
    console.log("Initializing complete!");  
  }
});

module.exports = Initializing;
