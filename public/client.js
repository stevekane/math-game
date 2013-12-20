var io= require('socket.io-client')
  , socket = io.connect("ws://localhost:8080")
  , RouterComponent = require('./components/components.jsx').RouterComponent;

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

  console.log(targetState, roomName);
  //TODO: should probably check if the target state is valid 

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

var gui = React.renderComponent(RouterComponent({
  room: room,
  lobby: lobby,
  user: user
}), document.body);
