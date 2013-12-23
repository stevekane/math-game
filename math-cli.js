var io = require('socket.io-client')
  , socket = io.connect('http://localhost:8080')
  , GUI = require('./gui');

var lobby = {
  rooms: []  
};

var user = {
  name: ""
};

var room = {
  users: [],
  question: "",
  answer: ""
};

var handleConnect = function () {
  console.log("connection established");  
  socket.emit("begin", {name: "MathCLI"});
};

var handleBeginConfirm = function (user) {
  gui.setProps({user: user});
  socket.emit("join", "addition");
};

var handleJoinRoom = function (roomName) {
  gui.setState({
    activeState: "room",
    roomName: roomName
  });
};

var handleJoinLobby = function (lobbyName) {
  gui.setState({
    activeState: "lobby",
    roomName: lobbyName
  }); 
};

var handleNameChangeConfirm = function (user) {
  gui.setProps({user: user});
};

var updateLobby = function (lobby) {
  gui.setProps({lobby: lobby});
};

var updateRoom = function (room) {
  gui.setProps({room: room});
};

socket
  .on("connect", handleConnect)
  .on("begin-confirm", handleBeginConfirm)
  .on("join-room", handleJoinRoom)
  .on("join-lobby", handleJoinLobby)
  .on("name-change-confirm", handleNameChangeConfirm)
  .on("tick-lobby", updateLobby)
  .on("tick-room", updateRoom);

var gui = new GUI(room, lobby, user);
setInterval(function () {
  gui.tick();
}, 1000);
