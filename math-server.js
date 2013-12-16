var http = require('http')
  , ecstatic = require('ecstatic')
  , cloak = require('cloak');

//create our game object, and instances of our states
var MathGame = require('./game/MathGame');

//custom and room socket event handlers, pass a reference to cloak
var clientMessageHandlers = require('./cloak/client-handlers')(cloak)
  , roomEventHandlers = require('./cloak/room-handlers')(cloak)
  , lobbyEventHandlers = require('./cloak/lobby-handlers')(cloak);

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
  autoJoinLobby: true,
  messages: clientMessageHandlers,
  lobby: lobbyEventHandlers,
  room: roomEventHandlers
});
cloak.run();

//HACK BECAUSE LOBBY PULSE ISNT WORKING...
var lobby = cloak.getLobby();
setInterval(function () {
  lobby._emitEvent("pulse", lobby);
}, 1000);

//Create rooms!  A DSL or smarter constructor might be nice?
var additionRoom = cloak.createRoom("addition")
  , additionGame = new MathGame({room: additionRoom});
additionRoom.game = additionGame;

var subtractionRoom = cloak.createRoom("subtraction")
  , subtractionGame = new MathGame({room: subtractionRoom});
subtractionRoom.game = subtractionGame;

var multiplicationRoom = cloak.createRoom("multiplication")
  , multiplicationGame = new MathGame({room: multiplicationRoom});
multiplicationRoom.game = multiplicationGame;

var divisionRoom = cloak.createRoom("division")
  , divisionGame = new MathGame({room: divisionRoom});
divisionRoom.game = divisionGame;

//static file server for our client application
var server = http.createServer(
  ecstatic({root: __dirname + "/public"})
);

server.listen(1234, function () {
  console.log("http listening on 1234");
});
