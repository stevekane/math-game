var Lobby = React.createClass({
  
  selectRoom: function (room) {
    this.props.game.cloak.message("join", room.name);
  },
  
  render: function () {
    var rooms = this.props.rooms
      , self = this;

    return (
    <div className="col-md-3">
      <ul className="list-group">
      {
        rooms.map(function (room) {
          return (
          <li className="list-group-item"
          onClick={self.selectRoom.bind(self, room)}>
            <span className="badge">{room.users.length}</span>
            {room.name || "math"}
          </li>
          );
        })
      }
      </ul> 
    </div>
    ); 
  }
});

module.exports = Lobby;
