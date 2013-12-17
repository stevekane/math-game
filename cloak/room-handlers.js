//create our game object, and instances of our states
var MathGame = require('./../game/MathGame');

/*
"this" is the room.  most things should delegate to the
game object associated with this room
*/
module.exports = function (cloak) {
  return {

    init: function (user) {
      console.log(this.name + " initialized"); 
      this.data.game = new MathGame({room: this});
    }, 

    pulse: function () {
      if (this.data.game) {
        this.data.game.send('tick'); 
      }
    },

    newMember: function (user) {
      this.data.game.send('roomNotEmpty');
    },

    memberLeaves: function (user) {
      this.messageMembers("memberLeaves", "dude gone");
      if (this.getMembers().length === 0) {
        this.data.game.send('roomIsEmpty'); 
      }
    },

    close: function (user) {
    
    },

    shouldAllowUser: function (user) {
      return true; 
    },
  };
};
