module.exports = function (game) {
  return {
    init: function (user) {
      console.log('room initialized'); 
    }, 
    pulse: function (user) {
      game.send('tick');       
    },
    newMember: function (user) {
      user.getRoom().messageMembers("newMember", "new guy!");
    },
    memberLeaves: function (user) {
      user.getRoom().messageMembers("memberLeaves", "dude left!");
    },
    close: function (user) {
    
    },
    shouldAllowUser: function (user) {
      return true; 
    },
  };
};
