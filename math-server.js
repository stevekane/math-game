var http = require('http')
  , inherits = require('util').inherits
  , ecstatic = require('ecstatic')
  , roomba = require('roomba-server')
  , socketIO = require('socket.io')
  , MathRoom = require('./game/MathRoom')
  , MathLobby = require('./game/MathLobby')
  , MathWizard = require('./game/MathWizard')

var server = socketIO.listen(8080)
  , lobby = new MathLobby("Lobby")
  , roomManager = new roomba.RoomManager(server, lobby)
  , additionRoom = new MathRoom("addition", "+")
  , subtractionRoom = new MathRoom("subtraction", "-")

server.set('log level', 1);

roomManager
  .addRoom(additionRoom)
  .addRoom(subtractionRoom)

lobby.start();
additionRoom.start();
subtractionRoom.start();

//SOCKET HANDLERS
var handleBegin = function (socket, roomManager) {
  return function (data) {
    var id = data.id
      , user = new MathWizard(socket, data.name || "MathWizard");

    roomManager.socketToUserMap[socket.id] = user;  
    roomManager.getLobby().addUser(user);
    socket.emit("beginConfirm", user.toJSON());
  };
};

var handleDisconnect = function (socket, roomManager) {
  return function () {
    var user = roomManager.socketToUserMap[socket.id];

    if (user) {
      user.room.removeUser(user);
      delete roomManager.socketToUserMap[socket.id];
    }
  }     
};

server.sockets.on("connection", function (socket) {
  socket 
    .on("begin", handleBegin(socket, roomManager))
    .on("disconnect", handleDisconnect(socket, roomManager))
});


http.createServer(ecstatic({root: __dirname + "/public"}))
.listen(1234, function () {
  console.log('static file server started on 1234');
});
