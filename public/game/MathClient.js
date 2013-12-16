var _ = require('lodash')
  , EventEmitter = require('events').EventEmitter
  , Game = require('./../../modules/game/Game')
  , Clock = require('tiny-clock')
  , InLobby = require('./states/InLobby')
  , InRoom = require('./states/InRoom')
  , Loading = require('./states/Loading');

var defaultStates = [
  new Loading,
  new InLobby,
  new InRoom
];

var MathClient = function (options) {
  var options = options || {}
    , states = options.states || defaultStates
    , self = this;

  this.room = options.room || null; 
  this.clock = options.clock || new Clock;
  this.states = [];

  _.forEach(states, function (state) {
    self.addState(state);
  });
  this.transitionTo('loading');
};

MathClient.prototype = Object.create(Game.prototype);

_.extend(MathClient.prototype, {
  
  updateRooms: function (rooms) {
    this.rooms = rooms; 
    this.emit('rooms', rooms);
  },
  newQuestion: function () {},
  showAnswer: function () {},
  updateScores: function () {},
  roomMemberJoined: function (user) {},
  roomMemberLeft: function (user) {},

});

module.exports = MathClient;
