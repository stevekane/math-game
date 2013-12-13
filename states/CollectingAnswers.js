var _ = require('lodash')
  , GameState = require('./../game/GameState');

var CollectingAnswers = function (name) {
  this.name = name || "collecting-answers";
  this.submissions = [];
  this.currentQuestion = null;
  this.currentAnswer = null;
};

//used in array.map.  
var calculatePoints = function (sub, index, array) {
  return {
    user: sub.user,
    score: array.length - index
  };
};

CollectingAnswers.prototype = Object.create(GameState.prototype);

_.extend(CollectingAnswers.prototype, {

  enqueueSubmission: function (submission) {
    this.submissions.push(submission);
    return this;
  },

  processSubmissions: function () {
    var pointTotals = _.chain(this.submissions)
      .filter({answer: this.currentAnswer})
      .uniq("user")
      .map(calculatePoints)
      .value();

    //HERE FOR TESTING ATM
    console.log(pointTotals.forEach(function (total) {
      console.log("User", total.user, "won", total.score, "points!!"); 
    }));
  },

  enter: function () {
    var self = this;

    console.log("You are collecting answers!"); 
    setTimeout(function () {
      self.game.transitionTo("displaying-answer");   
    }, 1000);
  },
  exit: function () {
    console.log("You are no longer collecting answers");  
  }
});

module.exports = CollectingAnswers;
