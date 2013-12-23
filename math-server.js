var http = require('http')
  , ecstatic = require('ecstatic')
  , roomba = require('roomba-server')
  , socketIO = require('socket.io')
  , _ = require('lodash')
  , MathRoom = require('./game/MathRoom')
  , MathLobby = require('./game/MathLobby')
  , MathWizard = require('./game/MathWizard')
  , app = http.createServer(ecstatic({root: __dirname + "/public"}))
  , server = socketIO.listen(app).set('log level', 1)
  , lobby = new MathLobby("lobby")
  , roomManager = new roomba.RoomManager(server, lobby)
  , additionRoom = new MathRoom("addition", "+", 12, 3)
  , subtractionRoom = new MathRoom("subtraction", "-", 100, 2)
  , multiplicationRoom = new MathRoom("multiplication", "*", 12, 2);

roomManager
  .addRoom(additionRoom)
  .addRoom(subtractionRoom)
  .addRoom(multiplicationRoom)

lobby.start();
additionRoom.start();
subtractionRoom.start();
multiplicationRoom.start();

//SOCKET HANDLERS
var handleBegin = _.curry(function (socket, roomManager, data) {
  var id = data.id
    , user = new MathWizard(socket, data.name || "MathWizard");

  roomManager.socketToUserMap[socket.id] = user;  
  roomManager.getLobby().addUser(user);
  socket.emit("begin-confirm", user.serializeState());
});

var handleDisconnect = _.curry(function (socket, roomManager, data) {
  var user = roomManager.socketToUserMap[socket.id];

  if (user) {
    user.room.removeUser(user);
    delete roomManager.socketToUserMap[socket.id];
  }
});

var handleSubmission = _.curry(function (socket, roomManager, answer) {
  var user = roomManager.socketToUserMap[socket.id]; 

  user.room.storeSubmission({
    answer: Number(answer),
    user: user
  });
});

var handleJoin = _.curry(function (socket, roomManager, roomName) {
  var user = roomManager.socketToUserMap[socket.id]
    , targetRoom = roomManager.getRoomByName(roomName)
    , lobby = roomManager.getLobby();

  if (user.room) user.room.removeUser(user);
  if (targetRoom) {
    console.log(targetRoom.name);
    targetRoom.addUser(user); 
    socket.emit("join-room", user.room.name);
  } else {
    lobby.addUser(user);
    socket.emit("join-lobby", lobby.name);
  }
});

var handleNameChange = _.curry(function (socket, roomManager, name) {
  var user = roomManager.socketToUserMap[socket.id];

  user.name = name;
  socket.emit("name-change-confirm", user.serializeState());
});

server.sockets.on("connection", function (socket) {
  socket 
    .on("begin", handleBegin(socket, roomManager))
    .on("disconnect", handleDisconnect(socket, roomManager))
    .on("submission", handleSubmission(socket, roomManager))
    .on("name-change", handleNameChange(socket, roomManager))
    .on("join", handleJoin(socket, roomManager))
});

app.listen(8080, console.log.bind(console, "server on 8080"));
