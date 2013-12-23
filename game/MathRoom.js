var inherits = require('util').inherits
  ,  _ = require('lodash')
  , generateProblem = require('math-gen')  
  , RoomMixin = require('roomba-server').RoomMixin
  , slice = Function.prototype.call.bind(Array.prototype.slice);

var calculatePoints = function (sub, index, array) {
  return {
    user: sub.user,
    score: array.length - index
  };
};

var calculatePointTotals = function (answer, submissions) {
  return _.chain(submissions)
    .filter({answer: answer})
    .uniq("user")
    .map(calculatePoints)
    .value();
};

var updatePoints = function (pointTotal) {
  pointTotal.user.score += pointTotal.score;
};

var MathRoom = function (name, operator, maxValue, termCount) {
  RoomMixin.call(this, name); 

  this.operator = operator || "+";
  this.maxValue = maxValue || 12;
  this.termCount = termCount || 2;

  this.question = "";
  this.answer = "";
  //this stores the answer while collecting is happening
  this._answer = "";

  this.collectingDuration = 7000;
  this.displayingDuration = 4000;

  this.submissions = [];

  this.states = ["collecting", "displaying"];
  this.activeState = null;

  this.startTime = null;
  this.stopTime = null;
  this.nextSwitch = null;
  
  this._interval = null;
};

inherits(MathRoom, RoomMixin);

MathRoom.prototype.start = function () {
  var now = Date.now();

  this.startTime = now;
  this.stopTime = null;
  this.activeState = "displaying";
  this.nextSwitch = now + this.displayingDuration;
  this._interval = setInterval(_.bind(this.tick, this), 200);
  return this;
};

MathRoom.prototype.stop = function () {
  var now = Date.now();

  this.startTime = null;
  this.stopTime = now;
  this.nextSwitch = null;
  clearInterval(this._interval);
  return this;
};

MathRoom.prototype.storeSubmission = function (submission) {
  var numericalAnswer = Number(submission.answer);

  if (this.activeState === "collecting") {
    submission.answer = numericalAnswer;
    this.submissions.push(submission);
  }
  return this;
};

MathRoom.prototype.serializeState = function () {
  return {
    name: this.name,
    question: this.question,
    answer: this.answer,
    users: _.invoke(this.getUsers(), "serializeState")
  };
};

function collectingTick (game) {
  var now = Date.now()
    , pointTotals;

  if (now > game.nextSwitch) {
    pointTotals = calculatePointTotals(game._answer, game.submissions); 
    _.forEach(pointTotals, updatePoints);  
    game.answer = game._answer;
    game.activeState = "displaying";
    game.nextSwitch = now + game.displayingDuration;
  }     
};

function displayingTick (game) {
  var now = Date.now()
    , problem;

  if (now > game.nextSwitch) {
    problem = generateProblem(game.operator, game.termCount, game.maxValue);
    game.question = problem.question;
    game._answer = problem.answer;
    game.answer = "";

    game.activeState = "collecting";
    game.nextSwitch = now + game.collectingDuration;
  }
};

MathRoom.prototype.tick = function () {
  var roomState = this.serializeState()
    , sockets = _.pluck(this.getUsers(), "socket");

  if (this.activeState === "collecting") collectingTick(this);
  else if (this.activeState === "displaying") displayingTick(this);
  _.invoke(sockets, "emit", "tick-room", roomState);
};

module.exports = MathRoom;
