//modified version of cloak's client to be used with browserify
var cloak = require('cloak-browserify')
  , components = require('./components.jsx');

var Game = function (options) {
  this.question = "";
  this.answer = "";
  this.players = [];
  this.ui = options.ui;
};
Game.prototype = Object.create({});
Game.prototype.start = function () {
  this.ui.start();
};

var UI = function (hud) {
  this.hud = hud({
    cloak: cloak,
    question: "",
    answer: ""
  });
};
UI.prototype = Object.create({});
UI.prototype.start = function () {
  React.renderComponent(this.hud, document.body);
};

var ui = new UI(components.HUD);

Game.prototype.newQuestion = function (newQuestion) {
  this.question = newQuestion;
  this.answer = "";
  this.ui.hud.setProps({
    question: newQuestion,
    answer: ""
  });
};
Game.prototype.showAnswer = function (answer) {
  this.answer = answer;
  this.ui.hud.setProps({answer: answer});
};
Game.prototype.updateScores = function (pointTotals) {
  console.log(pointTotals);
};

var game = new Game({ui: ui});
game.start();

//explicitly inject cloak onto the game object allowing us to
//delegate to the network layer
game.cloak = cloak;

var serverEvents = require('./events/server')(game)
  , customEvents = require('./events/custom')(game)
  , timerEvents = require('./events/timer')(game);

var cloakPort = "http://localhost:1337";

cloak.configure({
  messages: customEvents,
  serverEvents: serverEvents,
  timerEvents: timerEvents
});

cloak.run(cloakPort);
