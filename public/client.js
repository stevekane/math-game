//modified version of cloak's client to be used with browserify
var cloak = require('cloak-browserify')

var Game = function () {};
Game.prototype = Object.create({});
Game.prototype.newQuestion = function (question) {
  document.querySelectorAll('#current-question')[0].innerText = question;
  document.querySelectorAll('#current-answer')[0].innerText = "";
};
Game.prototype.showAnswer = function (answer) {
  document.querySelectorAll('#current-answer')[0].innerText = answer;
};
Game.prototype.updateScores = function (pointTotals) {
  console.log(pointTotals);
};

var game = new Game;

var input = document.getElementById('answer-input');
input.onsubmit = function () {};
input.addEventListener('keydown', function (e) {
  var answer = input.value;

  if (e.keyCode === 13) {
    console.log('enter detected with value ', answer);
    cloak.message('answer', answer);
    input.value = "";
    e.preventDefault(); 
    return false;
  }
  return true;
});

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
