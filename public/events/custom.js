module.exports = function (game) {
  return {
    rooms: function (rooms) {
      game.updateRooms(rooms);
    },

    tick: function () {
      console.log('tick recieved'); 
    },

    //called when a new problem has arrived
    question: function (question) {
      console.log(question);
      game.send("newQuestion", question);
    },

    answer: function (answer) {
      game.send("showAnswer", answer);
    },

    scores: function (pointTotals) {
      game.send("updateScores", pointTotals); 
    },
  };
};
