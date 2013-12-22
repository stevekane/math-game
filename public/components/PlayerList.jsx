var highlightActive = function (id, activeId) {
  return id === activeId 
    ? "list-group-item active"
    : "list-group-item";
};

var playerSummary = function (player, activePlayer) {
  return (
  <a className={highlightActive(player.id, activePlayer.id)} >
    {player.name}
    <span className="badge">{player.score}</span>
  </a>
  );
};

var PlayerList = React.createClass({
  render: function () {
    var players = this.props.players
      , activePlayer = this.props.activePlayer;

    return (
    <div>
      <div className="player-list list-group">
        {
        players.map(function (player) {
          return playerSummary(player, activePlayer); 
        })
        }
      </div>
    </div>
    );
  }
});

module.exports = PlayerList;
