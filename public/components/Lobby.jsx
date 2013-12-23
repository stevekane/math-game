var roomSummary = function (room, roomName) {
  var cx = React.addons.classSet
  var classes = cx({
    "list-group-item": true,
    "active": room.name === roomName
  });
  return (
  <a className={classes} href={"#room/" + room.name}>
    <span className="badge">{room.users.length}</span>
    {room.name || "math"}
  </a>
  );
};

var Lobby = React.createClass({
  
  render: function () {
    var rooms = this.props.rooms
      , roomName = this.props.roomName
      , self = this;

    return (
    <div className="col-md-3">
      <div className="list-group">
      {
        rooms.map(function (room) {
          return roomSummary(room, roomName);
        })
      }
      </div> 
    </div>
    ); 
  }
});

module.exports = Lobby;
