var Game = require('./game/MathClient')
  , cloak = require('cloak-browserify')
  , components = require('./components.jsx');

var game = new Game;

//inject ref to cloak onto the game
game.cloak = cloak;

var gui = React.renderComponent(components.GameComponent({
  game: game,
  rooms: []
}), document.body);

game.on('transition', function (name) {
  gui.setState({
    activeState: name   
  });
});

game.on('rooms', function (rooms) {
  gui.setProps({
    rooms: rooms 
  });
});

//register all our socket events with a ref to game
var serverEvents = require('./events/server')(game)
  , customEvents = require('./events/custom')(game)
  , timerEvents = require('./events/timer')(game);

cloak.configure({
  messages: customEvents,
  serverEvents: serverEvents,
  timerEvents: timerEvents
});

cloak.port = "http://localhost:1337",
cloak.run(cloak.port);
