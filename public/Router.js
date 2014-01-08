var Router = function (game) {
  this.game = game;
  this._boundProcess = this.processHash.bind(this);
};

Router.prototype.processHash = function () {
  var hash = window.location.hash.replace("#", "")
    , isRoomLookup = hash.indexOf('room') > -1
    , roomName = isRoomLookup
      ? hash.split("/")[1]
      : "lobby";

  this.game.socket.emit("join", roomName);
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
