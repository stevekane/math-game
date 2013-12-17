var _ = require('lodash')
  , GameState = require('./../../modules/game/GameState');

var CollectingAnswers = function (name) {
  this.name = name || "collecting-answers";
  this.submissions = [];
  this.duration = 7000;
};

//THIS IS A STUB FOR A FUTURE SYSTEM
var generateProblem = function () {
  var first = Math.floor(Math.random() * 100)
    , second = Math.floor(Math.random() * 100)
    , question = String(first) + " + " + String(second)
    , answer = eval(question);

  return {
    question: question,
    answer: answer
  };
};

//used in array.map.  
var calculatePoints = function (sub, index, array) {
  return {
    user: sub.user,
    score: array.length - index
  };
};

var calculatePointTotals = function (answer, submissions) {
  console.log(answer, submissions);
  return _.chain(submissions)
    .map(function (sub) {
      return {
        answer: Number(sub.answer),
        user: sub.user
      }; 
    })
    .filter({answer: answer})
    .uniq("user")
    .map(calculatePoints)
    .value();
};

CollectingAnswers.prototype = Object.create(GameState.prototype);

_.extend(CollectingAnswers.prototype, {

  enqueueSubmission: function (submission) {
    this.submissions.push(submission);
    return this;
  },

  //called every 100ms by the game system
  tick: function () {
    var pointTotals;

    if (this.game.clock.getElapsed() > this.duration) {
      pointTotals = calculatePointTotals(this.game.currentAnswer, this.submissions);
      console.log("Point totals:", pointTotals);
      //this.game.persistence.save(pointTotals);
      this.game.room.messageMembers("scores", pointTotals);
      this.game.transitionTo("displaying-answer", this.game.currentAnswer);   
    }
    this.game.room.messageMembers("tick", "tickdata");
  },

  /**
  These are functions invoke by state changes. 
  */
  enter: function () {
    var self = this
      , now = Date.now()
      , problem = generateProblem();

    this.submissions = [];
    this.game.clock.startTime = now;
    this.game.clock.timeStamp = now;
    this.game.currentQuestion = problem.question;
    this.game.currentAnswer = problem.answer;
    this.game.room.messageMembers("question", this.game.currentQuestion);
    console.log("Problem is: ", this.game.currentQuestion);
  },

  exit: function () {
    console.log("You are no longer collecting answers");  
  }
});

module.exports = CollectingAnswers;
