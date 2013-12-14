var http = require('http')
  , ecstatic = require('ecstatic')
  , cloak = require('cloak');

//create our game object, and instances of our states
var MathGame = require('./game/MathGame');

//custom and room socket event handlers, pass a reference to cloak
var clientMessageHandlers = require('./cloak/client-handlers.js')(cloak)
  , roomEventHandlers = require('./cloak/room-handlers.js')(cloak);

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

/*
here we are explicitly attaching a reference to the game object
on the room.  this is useful because it allows the room events to
delegate into the game objects (and their associated states)
*/
var game = new MathGame({room: room});
room.game = game;

//static file server for our client application
var server = http.createServer(
  ecstatic({root: __dirname + "/public"})
);

server.listen(1234, function () {
  console.log("http listening on 1234");
});
