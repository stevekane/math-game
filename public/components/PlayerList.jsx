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

module.exports = PlayerList;
