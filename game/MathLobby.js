var inherits = require('util').inherits
  , _ = require('lodash')
  , RoomMixin = require('roomba-server').RoomMixin

var MathLobby = function (name) {
  RoomMixin.call(this, name);

  this.startTime = null;
  this.stopTime = null;

  this._interval = null;
};

inherits(MathLobby, RoomMixin);

MathLobby.prototype.start = function () {
  var now = Date.now();

  this.startTime = now;
  this.stopTime = null;
  this._interval = setInterval(_.bind(this.tick, this), 500);
  return this;
};

MathLobby.prototype.stop = function () {
  var now = Date.now();

  this.startTime = null;
  this.stopTime = now;
  clearInterval(this._interval);
  return this;
};

MathLobby.prototype.serializeState = function () {
  return {
    users: _.invoke(this.getUsers(), "serializeState"),
    rooms: _.invoke(this.roomManager.getRooms(), "serializeState")
  }; 
};

MathLobby.prototype.tick = function () {
  var lobbyState = this.serializeState()
    , lobbyUsers = this.getUsers()
    , roomUsers = _.flatten(_.invoke(this.roomManager.getRooms(), "getUsers"));

  _.invoke(roomUsers, "message", "tick-lobby", lobbyState);
  _.invoke(lobbyUsers, "message", "tick-lobby", lobbyState);
};

module.exports = MathLobby;
