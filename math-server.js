var http = require('http')
  , ecstatic = require('ecstatic')
  , cloak = require('cloak')

var clientMessageHandlers = require('./eventHandlers/client.js')
  , roomEventHandlers = require('./eventHandlers/room.js')
  , game = new require('./Game.js');

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
