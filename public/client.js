var io= require('socket.io-client')
  , Router = require('./Router')
  , RouterComponent = require('./components/Router.jsx')
  , path = window.location
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
  router.processHash();
};

var handleJoinRoom = function (roomName) {
  window.location.hash = "#room/" + roomName
  gui.setState({
    activeState: "room",
    roomName: roomName
  });
};

var handleJoinLobby = function (lobbyName) {
  window.location.hash = "#lobby";
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

var gui = React.renderComponent(RouterComponent({
  room: room,
  lobby: lobby,
  user: user,
  socket: socket
}), document.body);

var router = new Router(gui).start();
