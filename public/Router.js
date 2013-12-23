var Router = function (gui) {
  this.gui = gui; 
  this._boundProcess = this.processHash.bind(this);
};

Router.prototype.processHash = function () {
  var hash = window.location.hash.replace("#", "")
    , isRoomLookup = hash.indexOf('room') > -1
    , roomName = hash.split("/")[1];

  this.gui.setState({
    roomName: "lobby",
    activeState: "lobby"
  });

  if (isRoomLookup) {
    this.gui.props.socket.emit("join", roomName || "lobby");
  }
};

Router.prototype.start = function () {
  window.addEventListener("hashchange", this._boundProcess);
  return this;
};

Router.prototype.stop = function () {
  window.removeEventListener("hashchange", this._boundProcess);
  return this;
};

module.exports = Router;
