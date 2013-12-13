module.exports = function (game) {
  return {
    connecting: function () {
      console.log("you are trying to connect"); 
    },
    begin: function () {
      console.log("you have connected!"); 
      game.cloak.message('join', 'addition');
    },
    resume: function () {
      console.log("you have re-connected!"); 
      game.cloak.message('join', 'addition');
    },
    disconnect: function () {
      console.log("you have disconnected!"); 
    },
    end: function () {},
    error: function (err) {
      console.log("there was an error when connecting"); 
    },
    joinedRoom: function (roomName) {
      console.log("you joined room ", roomName); 
    },
    leftRoom: function (roomName) {},
    roomMemberJoined: function (user) {},
    roomMemberLeft: function (user) {},
    lobbyMemberJoined: function (user) {},
    lobbyMemberLeft: function (user) {},
    roomCreated: function (roomCount) {},
    roomDeleted: function (roomCount) {}
  };
};
