var http = require('http')
  , ecstatic = require('ecstatic')
  , cloak = require('cloak');

//custom and room socket event handlers, pass a reference to cloak
var clientHandlers = require('./cloak/client-handlers')(cloak)
  , roomHandlers = require('./cloak/room-handlers')(cloak)
  , lobbyHandlers = require('./cloak/lobby-handlers')(cloak);

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
  autoJoinLobby: false,
  messages: clientHandlers,
  lobby: lobbyHandlers,
  room: roomHandlers
});
cloak.run();

//HACK BECAUSE LOBBY PULSE ISNT WORKING...
var lobby = cloak.getLobby();
setInterval(function () {
  lobby._emitEvent("pulse", lobby);
}, 1000);

//Create rooms!  A DSL or smarter constructor might be nice?
cloak.createRoom("addition");
cloak.createRoom("subtraction");
cloak.createRoom("multiplication");
cloak.createRoom("division");

//static file server for our client application
var server = http.createServer(
  ecstatic({root: __dirname + "/public"})
);

server.listen(1234, function () {
  console.log("http listening on 1234");
});
