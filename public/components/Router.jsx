var NavBar = require('./NavBar.jsx')
  , Room = require('./Room.jsx')
  , Lobby = require('./Lobby.jsx');

var renderState = function (stateName, props) {
  var state
    , room = props.room;

  return stateName === "room"
    ? <Room players={room.users} question={room.question} answer={room.answer} />
    : <h1>Join a game to play!</h1>;
};

var RouterComponent = React.createClass({
  getInitialState: function () {
    return {
      states: ["lobby", "room"],
      roomName: "lobby",
      activeState: "lobby"
    }; 
  },

  render: function () {
    return (
    <div>
      <NavBar user={this.props.user} />
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <Lobby rooms={this.props.lobby.rooms} />
          {renderState(this.state.activeState, this.props)}
        </div>
      </div>
    </div>
    );
  },
});

module.exports = RouterComponent;
