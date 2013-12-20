var io= require('socket.io-client')
  , socket = io.connect("ws://localhost:8080")
  , Router = require('./components/Router.jsx');

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
  socket.emit("begin", {name: "Steve"});
};

var handleBeginConfirm = function (user) {
  gui.setProps({user: user});
};

var handleJoinConfirm = function (roomName) {
  var targetState = roomName === "lobby" ? "lobby" : "room";

  //TODO: should probably check if the target state is valid 
  //ON STATE CHANGE SHOULD PROBABLY DO WORK INTERNALLY.  JUST
  //SEND THE ROOMNAME
  gui.setState({
    activeState: targetState,
    roomName: roomName
  });
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
  //IMPLEMENT .on("submit-confirm", handleSubmitConfirm)
  .on("tick-lobby", updateLobby)
  .on("tick-room", updateRoom);

//TODO: REMOVE.  JUST FOR TESTING
window.socket = socket;

var gui = React.renderComponent(Router({
  room: room,
  lobby: lobby,
  user: user,
  socket: socket
}), document.body);
