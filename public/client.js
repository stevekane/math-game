var io= require('socket.io-client')
  , socket = io.connect("ws://localhost:8080");

var handleConnect = function () {
  console.log("connection established");  
  socket.emit("begin", {name: "Steve"});
};

var handleBeginConfirm = function (data) {
  console.log("You are logged in as ", data); 
};

var handleTick = function (data) {
  console.log(data);
};

socket
  .on("connect", handleConnect)
  .on("beginConfirm", handleBeginConfirm)
  .on("tick", handleTick);
