var test = require('tape')
  , Game = require('./../game/Game');

test("Game is a constructor", function (t) {
  var cloak = {}
    , game = new Game(cloak); 

  t.plan(3);
  t.ok(typeof Game === "function", "Game is a constructor");
  t.ok(typeof game === "object", "state is an instance");
  t.same(game.cloak, cloak, "cloak attribute assigned to instance");
});
