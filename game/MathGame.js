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
  var states = options.states || defaultStates
    , self = this;

  this.room = options.room || null; 
  this.clock = options.clock || new Clock;
  this.states = [];

  _.forEach(states, function (state) {
    self.addState(state);
  });
  this.transitionTo('waiting');
}

MathGame.prototype = Object.create(Game.prototype);

_.extend(MathGame.prototype, {

  tick: function () {},

  roomIsEmpty: function () {
    this.transitionTo('waiting'); 
  },

  //no-op
  roomNotEmpty: function () {},
});

module.exports = MathGame;
