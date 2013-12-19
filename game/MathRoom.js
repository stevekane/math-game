var inherits = require('util').inherits
  ,  _ = require('lodash')
  , Room = require('roomba-server').Room
  , slice = Function.prototype.call.bind(Array.prototype.slice);

//THIS IS A STUB FOR A FUTURE SYSTEM
var generateProblem = function (operator) {
  var first = Math.floor(Math.random() * 100)
    , second = Math.floor(Math.random() * 100)
    , question = String(first) + String(operator) + String(second)
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

var updatePoints = function (pointTotal) {
  pointTotal.user.points += pointTotal.score;
};

var MathRoom = function (name, operator) {
  Room.call(this, name); 

  this.operator = operator || "+";

  this.question = "";
  this.answer = "";
  //this stores the answer while collecting is happening
  this._answer = "";

  this.collectingDuration = 7000;
  this.displayingDuration = 4000;

  this.submission = [];

  this.states = ["collecting", "displaying"]
  this.activeState = null;

  this.startTime = null;
  this.stopTime = null;
  this.nextSwitch = null;
  
  this._interval = null;
};

inherits(MathRoom, Room);

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
  if (!isNan(numericalAnswer) && this.activeState === "collecting") {
    submission.answer = numericalAnswer;
    this.submissions.push(submisison);
  }
  return this;
};

function collectingTick (game) {
  var now = Date.now()
    , pointTotals;

  if (now > game.nextSwitch) {
    pointTotals = calculatePointTotals(game._answer, game.submissions); 
    _.forEach(pointTotals, updatePoints);  
    game.answer = game._answer;
    console.log(game.serializeGameState());
    game.activeState = "displaying";
    game.nextSwitch = now + game.displayingDuration;
  }     
};

function displayingTick (game) {
  var now = Date.now()
    , problem;

  if (now > game.nextSwitch) {
    problem = generateProblem(game.operator);
    game.question = problem.question;
    game._answer = problem.answer;
    game.answer = "";

    game.activeState = "collecting";
    game.nextSwitch = now + game.collectingDuration;
  }
};

MathRoom.prototype.serializeGameState = function () {
  return {
    question: this.question,
    answer: this.answer,
    users: _.invoke(this.users, "toJSON")
  };
};

MathRoom.prototype.tick = function () {
  var gameState = this.serializeGameState();

  if (this.activeState === "collecting") collectingTick(this);
  else if (this.activeState === "displaying") displayingTick(this);
  _.forEach(this.getUsers(), function (user) {
    user.socket.emit('tick', gameState);
  });
};

module.exports = MathRoom;
