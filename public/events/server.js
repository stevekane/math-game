var _ = require('lodash');

module.exports = function (game) {
  return {
    connecting: function () {
      console.log("you are trying to connect"); 
    },
    begin: function () {
      console.log("you have connected!"); 
      window.setTimeout(function () {
        game.cloak.message("join", "addition");  
      }, 2000);
    },
    resume: function () {
      console.log("you have re-connected!"); 
    },
    disconnect: function () {
      console.log("you have disconnected!"); 
    },
    end: function () {},
    error: function (err) {
      console.log("there was an error when connecting"); 
    },

    joinedRoom: function (roomName) {
      if ("Lobby" === roomName.name) {
        game.transitionTo("in-lobby"); 
      } else {
        game.transitionTo("in-room"); 
      }
    },

    leftRoom: function (roomName) {},

    roomMemberJoined: function (user) {
      game.send('roomMemberJoined', user);
    },
    roomMemberLeft: function (user) {
      game.send('roomMemberLeft', user);
    },
    lobbyMemberJoined: function (user) {},
    lobbyMemberLeft: function (user) {},
    roomCreated: function (roomCount) {},
    roomDeleted: function (roomCount) {}
  };
};
