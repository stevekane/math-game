var playerSummary = function (player, activePlayer) {
  var cx = React.addons.classSet;
  var classes = cx({
    "list-group-item": true,
    "active": player.id === activePlayer.id
  });

  return (
  <a className={classes} >
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
