var io= require('socket.io-client')
  , Router = require('./components/Router.jsx')
  , path = "ws://" + window.location.hostname + ":8080"
  , socket = io.connect(path);

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
  socket.emit("begin", {name: "MathWizard"});
};

var handleBeginConfirm = function (user) {
  gui.setProps({user: user});
};

var handleJoinConfirm = function (roomName) {
  var targetState = roomName === "lobby" ? "lobby" : "room";

  gui.setState({
    activeState: targetState,
    roomName: roomName
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
  .on("join-confirm", handleJoinConfirm)
  .on("name-change-confirm", handleNameChangeConfirm)
  //IMPLEMENT .on("submit-confirm", handleSubmitConfirm)
  .on("tick-lobby", updateLobby)
  .on("tick-room", updateRoom);

var gui = React.renderComponent(Router({
  room: room,
  lobby: lobby,
  user: user,
  socket: socket
}), document.body);
