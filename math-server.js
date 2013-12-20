var http = require('http')
  , ecstatic = require('ecstatic')
  , roomba = require('roomba-server')
  , socketIO = require('socket.io')
  , MathRoom = require('./game/MathRoom')
  , MathLobby = require('./game/MathLobby')
  , MathWizard = require('./game/MathWizard')
  , server = socketIO.listen(8080).set('log level', 1)
  , lobby = new MathLobby("lobby")
  , roomManager = new roomba.RoomManager(server, lobby)
  , additionRoom = new MathRoom("addition", "+")
  , subtractionRoom = new MathRoom("subtraction", "-");

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
    socket.emit("begin-confirm", user.serializeState());
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

var handleSubmission = function (socket, roomManager) {
  return function (answer) {
    var user = roomManager.socketToUserMap[socket.id]; 

    user.room.storeSubmission({
      answer: Number(answer),
      user: user
    });
  };
};

var handleJoin = function (socket, roomManager) {
  return function (roomName) {
    var user = roomManager.socketToUserMap[socket.id]
      , targetRoom = roomManager.getRoomByName(roomName);

    if (user.room) user.room.removeUser(user);
    if (targetRoom) targetRoom.addUser(user); 
    else roomManager.getLobby().addUser(user);
    socket.emit("join-confirm", user.room.name);
  };
};

server.sockets.on("connection", function (socket) {
  socket 
    .on("begin", handleBegin(socket, roomManager))
    .on("disconnect", handleDisconnect(socket, roomManager))
    .on("submission", handleSubmission(socket, roomManager))
    .on("join", handleJoin(socket, roomManager))
});

http.createServer(ecstatic({root: __dirname + "/public"}))
.listen(1234, console.log.bind(console, "server on 1234"));
