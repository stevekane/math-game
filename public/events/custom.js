module.exports = function (game) {
  return {
    echo: function (data) {
      console.log("server responded with ", data);
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
