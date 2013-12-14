var _ = require('lodash')
  , Game = require('./../modules/game/Game')
  , Clock = require('tiny-clock')
  , Waiting = require('./states/Waiting')
  , CollectingAnswers = require('./states/CollectingAnswers')
  , DisplayingAnswer = require('./states/DisplayingAnswer');

var defaultStates = [
  new Waiting,
  new CollectingAnswers,
  new DisplayingAnswer
];

var MathGame = function (options) {
  this.room = options.room || null; 
  this.clock = options.clock || new Clock;
  this.states = options.states || defaultStates;
  this.activeState = options.activeState || "waiting";
}

MathGame.prototype = Object.create(Game.prototype);

_.extend(MathGame.prototype, {
  tick: function () {
    console.log('tick handled by MathGame'); 
  },
});

module.exports = MathGame;
