var _ = require('lodash');

module.exports = function (cloak) {
  return {
    join: function (roomName, user) {
      var targetRoom = _.find(cloak.getRooms(), {name: roomName});
      if (targetRoom) {
        user.joinRoom(targetRoom);
      }
    }
  };
};
