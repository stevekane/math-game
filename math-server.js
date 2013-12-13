var http = require('http')
  , ecstatic = require('ecstatic')
  , cloak = require('cloak');

//create our game object, and instances of our states
var Game = require('./game/Game')
  , Initializing = require('./states/Initializing')
  , CollectingAnswers = require('./states/CollectingAnswers')
  , DisplayingAnswer = require('./states/DisplayingAnswer');

var game = new Game(cloak);
game
.addState(new CollectingAnswers)
.addState(new DisplayingAnswer)
.addState(new Initializing)
.transitionTo("initializing");

//define our socket message handlers and pass them a refernce to game
//these handlers will exclusively delegate into the game object
var clientMessageHandlers = require('./eventHandlers/client.js')(game)
  , roomEventHandlers = require('./eventHandlers/room.js')(game);

//static file server for our client application
var server = http.createServer(
  ecstatic({root: __dirname + "/public"})
);

/**
Configure our cloak game server.
messages define how the server responds to messages
sent over websocket connections.  These are going to
be simple, thin delegations into our game system.

The game mechanics should be insulated from the network
layer as much as possible.
*/
cloak.configure({
  port: 1337,
  autoCreateRooms: true,
  messages: clientMessageHandlers,
  room: roomEventHandlers
});

//start our cloak socket server and http fileserver
cloak.run();
server.listen(1234, function () {
  console.log("http listening on 1234");
});
