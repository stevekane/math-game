var _ = require('lodash');

var GUI = function (room, lobby, user) {
  this.props = {
    room: room,
    lobby: lobby,
    user: user
  };

  this.states = {
    states: ["lobby", "room"],
    activeState: "lobby",
    roomName: "lobby"
  };
};

var clearHUD = function () {
  console.log('\u001B[2J\u001B[0;0f');
};

var drawUser = function (user) {
  console.log("Welcome: " + user.name);
};

drawLobby = function (lobby) {
  var rooms = lobby.rooms.forEach(function (room) {
    console.log(room.name + "   " + room.users.length);
  });
};

var drawRoom = function (room) {
  console.log("Question: " + room.question);
  console.log("Answer: " + room.answer);
  var users = room.users.forEach(function (user) {
    console.log(user.name + "   " + user.score);
  });
};


GUI.prototype.tick = function () {
  clearHUD();
  drawUser(this.props.user);
  drawLobby(this.props.lobby);
  if (this.states.activeState === "room") {
    drawRoom(this.props.room);
  }
};

GUI.prototype.setState = function (states) {
  _.extend(this.states, states);
};

GUI.prototype.setProps = function (props) {
  _.extend(this.props, props); 
};

module.exports = GUI;
