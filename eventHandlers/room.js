/*
"this" is the room.  most things should delegate to the
game object associated with this room
*/
module.exports = function (cloak) {
  return {
    init: function (user) {
      console.log('room initialized'); 
    }, 
    pulse: function () {
      this.game.send('tick');       
    },
    newMember: function (user) {
      this.messageMembers("memberLeaves", "dude here");
    },
    memberLeaves: function (user) {
      this.messageMembers("memberLeaves", "dude gone");
    },
    close: function (user) {
    
    },
    shouldAllowUser: function (user) {
      return true; 
    },
  };
};
