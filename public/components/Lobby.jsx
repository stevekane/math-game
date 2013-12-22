var highlightActive = function (name, activeName) {
  return name === activeName 
    ? "list-group-item active"
    : "list-group-item";
};

var Lobby = React.createClass({
  
  selectRoom: function (room) {
    this.props.socket.emit("join", room.name);
  },
  
  render: function () {
    var rooms = this.props.rooms
      , activeRoom = this.props.activeRoom
      , self = this;

    return (
    <div className="col-md-3">
      <div className="list-group">
      {
        rooms.map(function (room) {
          return (
          <a
            className={highlightActive(room.name, activeRoom)}
            onClick={self.selectRoom.bind(self, room)}>
            <span className="badge">{room.users.length}</span>
            {room.name || "math"}
          </a>
          );
        })
      }
      </div> 
    </div>
    ); 
  }
});

module.exports = Lobby;
