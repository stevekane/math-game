module.exports = function (game) {
  return {
    rooms: function (rooms) {
      game.updateRooms(rooms);
    },

    //called when a new problem has arrived
    question: function (question) {
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
