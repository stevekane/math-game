var NavBar = require('./NavBar.jsx')
  , Room = require('./Room.jsx')
  , Lobby = require('./Lobby.jsx');

var renderState = function (stateName, props) {
  if (stateName === "room") {
    return (
    <Room
      players={props.room.users}
      question={props.room.question}
      answer={props.room.answer} 
      socket={props.socket} />
    ); 
  } else {
    return <h1>Join a game to play!</h1>;
  }
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
          <Lobby
            rooms={this.props.lobby.rooms}
            socket={this.props.socket} />
          {renderState(this.state.activeState, this.props)}
        </div>
      </div>
    </div>
    );
  },
});

module.exports = RouterComponent;
