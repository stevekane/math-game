var http = require('http')
  , ecstatic = require('ecstatic')
  , cloak = require('cloak');

//create our game object, and instances of our states
var Game = require('./game/Game')
  , Clock = require('./systems/Clock')
  , Waiting = require('./states/Waiting')
  , CollectingAnswers = require('./states/CollectingAnswers')
  , DisplayingAnswer = require('./states/DisplayingAnswer');

//custom and room socket event handlers, pass a reference to cloak
var clientMessageHandlers = require('./eventHandlers/client.js')(cloak)
  , roomEventHandlers = require('./eventHandlers/room.js')(cloak);

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
  minRoomMembers: 0,
  defaultRoomSize: null,
  messages: clientMessageHandlers,
  room: roomEventHandlers
});
cloak.run();

//Create rooms!  A DSL or smarter constructor might be nice?
var room = cloak.createRoom("addition");
var game = new Game(room, new Clock);
/*
here we are explicitly attaching a reference to the game object
on the room.  this is useful because it allows the room events to
delegate into the game objects (and their associated states)
*/
room.game = game;

game
.addState(new CollectingAnswers)
.addState(new DisplayingAnswer)
.addState(new Waiting)
.transitionTo("waiting");

//static file server for our client application
var server = http.createServer(
  ecstatic({root: __dirname + "/public"})
);

server.listen(1234, function () {
  console.log("http listening on 1234");
});
