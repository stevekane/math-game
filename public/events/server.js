module.exports = function (game) {
  return {
    connecting: function () {
      console.log("you are trying to connect"); 
    },
    begin: function () {
      console.log("you have connected!"); 
    },
    resume: function () {},
    disconnect: function () {
      console.log("you have disconnected!"); 
    },
    end: function () {},
    error: function (err) {},
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
