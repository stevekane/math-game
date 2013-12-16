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
      value: "",
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
      return <p>Nothing</p>; 
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

var createRoomTile = function (room) {
  return <li className="list-group-item">{room.title}</li>
};

var Lobby = React.createClass({
  render: function () {
    var rooms = this.props.rooms;

    return (
      <div className="row">
        <ul className="col-md-4 list-group">
          {rooms.map(createRoomTile)}
        </ul> 
      </div>  
    ); 
  }
});

module.exports.AnswerInput = AnswerInput;
module.exports.Room = Room;
