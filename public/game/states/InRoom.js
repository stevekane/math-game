var _ = require('lodash')
  , GameState = require('./../../../modules/game/GameState');

var InRoom = function (name) {
  this.name = name || "in-room";
  this.question = "";
  this.answer = "";
  this.players = [];
};

InRoom.prototype = Object.create(GameState.prototype);

_.extend(InRoom.prototype, {

  enter: function () {
    console.log("you are in a room!"); 
  }, 

  newQuestion: function (question) {
    this.question = question; 
  },

  showAnswer: function (answer) {
    this.answer = answer; 
  },

  updateScores: function (pointTotals) {
    console.log(pointTotals); 
  },

  roomMemberJoined: function (user) {
    console.log('roomMemberJoined', user);
    this.players.push(user); 
  },

  roomMemberLeft: function (user) {
    console.log('this should remove a user.  fix it!');
  }

});

module.exports = InRoom;
