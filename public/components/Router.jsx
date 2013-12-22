var NavBar = require('./NavBar.jsx')
  , Room = require('./Room.jsx')
  , Lobby = require('./Lobby.jsx');

var renderState = function (stateName, props) {
  if (stateName === "room") {
    return (
    <Room
      players={props.room.users}
      activePlayer={props.user}
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
      <NavBar
        user={this.props.user} 
        socket={this.props.socket} />
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <Lobby
            rooms={this.props.lobby.rooms}
            roomName={this.state.roomName}
            socket={this.props.socket} />
          {renderState(this.state.activeState, this.props)}
        </div>
      </div>
    </div>
    );
  },
});

module.exports = RouterComponent;
