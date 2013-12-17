/*
"this" is the lobby.  most things should delegate to the
game object associated with this room
*/
module.exports = function (cloak) {
  return {

    init: function () {
      console.log('lobby initialized'); 
    }, 

    pulse: function () {
      cloak.messageAll("rooms", cloak.getRooms(true)); 
    },

    newMember: function (user) {
      console.log('newMember lobby fired'); 
    },

    memberLeaves: function (user) {
      console.log('memberLeaves lobby fired'); 
    },

    close: function (user) {
      console.log('close lobby fired'); 
    }
  };
};
