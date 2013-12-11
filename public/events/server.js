module.exports = function (game) {
  return {
    connecting: function () {},
    begin: function () {},
    resume: function () {},
    disconnect: function () {},
    end: function () {},
    error: function (err) {},
    joinedRoom: function (roomName) {},
    leftRoom: function (roomName) {},
    roomMemberJoined: function (user) {},
    roomMemberLeft: function (user) {},
    lobbyMemberJoined: function (user) {},
    lobbyMemberLeft: function (user) {},
    roomCreated: function (roomCount) {},
    roomDeleted: function (roomCount) {}
  };
};
