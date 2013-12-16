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

var createPlayerSummary = function (player) {
  return <li className="player">{player.id + player.score}</li>
};

var PlayerList = React.createClass({
  render: function () {
    var players = this.props.players;

    if (!players) {
      return <li className="player">No players.</li>; 
    }

    return (
      <ul className="player-list">
        {players.map(createPlayerSummary)}
      </ul>
    );
  }
});

var Room = React.createClass({
  render: function () {
    return (
      <div className="row">
        <aside className="col-md-2">
          <PlayerList players={this.props.players} />
        </aside>

        <section className="col-md-4">
          <h1>{this.props.question}</h1>
          <h2>{this.props.answer}</h2>
          <AnswerInput cloak={this.props.cloak} />
        </section>
      </div>
    ); 
  }
});

var createRoomTile = _.curry(function (context, clickHandler, room) {
  return (
    <li onClick={clickHandler.bind(context, room)} className="list-group-item">
      {room.name}{room.users.length}
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
      <div className="row">
        <div className="col-md-4">
          <h1>Dat Lobby</h1>
          <ul className="col-md-4 list-group">
            {rooms.map(createRoomTile(self, self.selectRoom))}
          </ul> 
        </div>
      </div>  
    ); 
  }
});

var Loading = React.createClass({
  render: function () {
    return <h1>Loading</h1>; 
  }
});

var renderState = function (stateName, props) {
  switch (stateName) {
    case "in-lobby":
      return <Lobby rooms={props.rooms} game={props.game}/>
      break;
    case "in-room":
      return <Room players={[]} question="" answer="" />
      break;
    default:
      return <Loading /> 
      break;
  };
};

var GameComponent = React.createClass({
  getInitialState: function () {
    return {
      states: ['loading', 'in-lobby', 'in-room'],
      activeState: 'loading'
    };
  }, 

  render: function () {
    return renderState(this.state.activeState, this.props);
  }
});

module.exports.GameComponent = GameComponent;
