var _ = require('lodash');

var AnswerInput = React.createClass({
  getInitialState: function () {
    return {
      value: "",
    }; 
  },

  keyDown: function (e) {
    if (e.keyCode === 13) {
      this.submit(this.state.value);
      e.preventDefault(); 
      e.stopPropagation();
      return false;
    }
    return true;
  },

  submit: function (value) {
    this.props.cloak.message('answer', value);
    this.setState({
      value: ""
    });
  },

  handleChange: function (e) {
    this.setState({value: e.target.value}); 
  },

  render: function () {
    return (
    <input
      type="text"
      className="form-control"
      value={this.state.value}
      onChange={this.handleChange}
      onKeyDown={this.keyDown} />
    ); 
  },  
});

var playerPlaceholder = function () {
  return <li className="player list-group-item">No players</li>;
};


var playerSummary = function (player) {
  return (
  <li className="player list-group-item">
    {player.name}
    <span className="badge">{player.score}</span>
  </li>
  );
};

var PlayerList = React.createClass({
  render: function () {
    var players = this.props.players;

    return (
    <div>
      <ul className="player-list list-group">
        {!players ? playerPlaceholder() : players.map(playerSummary)}
      </ul>
    </div>
    );
  }
});

var Room = React.createClass({
  render: function () {
    return (
    <div className="col-md-9">
      <section className="col-md-9">
        <h1>Question: {this.props.question}</h1>
        <h2>Answer: {this.props.answer}</h2>
        <AnswerInput cloak={this.props.cloak} />
      </section>

      <aside className="col-md-3">
        <PlayerList players={this.props.players} />
      </aside>
    </div>
    ); 
  }
});

var createRoomTile = _.curry(function (context, clickHandler, room) {
  return (
  <li className="list-group-item" onClick={clickHandler.bind(context, room)}>
    <span className="badge">{room.users.length}</span>
    {room.name || "math"}
  </li>
  );
});

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
        {rooms.map(createRoomTile(self, self.selectRoom))}
      </ul> 
    </div>
    ); 
  }
});

var NavBar = React.createClass({
  render: function () {
    return (
    <nav className="navbar navbar-inverse navbar-static-top" role="navigation">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">So Math, Wow.</a>
        <p className="navbar-text">Welcome to hell, {this.props.user.name}</p>
      </div>
    </nav> 
    ); 
  },
});

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

module.exports.RouterComponent = RouterComponent;
