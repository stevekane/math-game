var http = require('http')
  , connect = require('connect')
  , cloak = require('cloak')

var clientMessageHandlers = require('./eventHandlers/client.js')
  , roomEventHandlers = require('./eventHandlers/room.js')
  , game = new require('./Game.js');

var app = connect()
.use(connect.static(__dirname + "/public"));

var server = http.createServer(app);

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

cloak.run();
server.listen(1234, function () {
  console.log("http listening on 1234");
});
