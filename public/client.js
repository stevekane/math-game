//modified version of cloak's client to be used with browserify
var cloak = require('cloak-browserify')
  , game = new Object();

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
