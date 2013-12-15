module.exports = function (game) {
  return {
    echo: function (data) {
      console.log("server responded with ", data);
    },

    //called when a new problem has arrived
    question: function (question) {
      game.newQuestion(question);
    },

    answer: function (answer) {
      game.showAnswer(answer);
    },

    scores: function (pointTotals) {
      game.updateScores(pointTotals); 
    },
  };
};
