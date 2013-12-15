var _ = require('lodash');

module.exports = function (cloak) {
  return {

    //join a specific room.
    join: function (roomName, user) {
      var targetRoom = _.find(cloak.getRooms(), {name: roomName});
      if (targetRoom) {
        user.joinRoom(targetRoom);
      }
    },

    //leave rooms.  will return you to lobby
    leave: function (data, user) {
      user.getRoom().removeMember(user);
    },

    answer: function (answer, user) {
      var submission = {
        answer: answer,
        user: user.id
      };
      user.getRoom().game.send("enqueueSubmission", submission);
    }
  };
};
