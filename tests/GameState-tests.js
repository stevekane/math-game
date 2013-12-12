var test = require('tape')
  , GameState = require('./../game/GameState');

test("GameState is a constructor", function (t) {
  var name = "test-state"
    , game = {}
    , state = new GameState(name, game); 

  t.plan(4);
  t.ok(typeof GameState === "function", "GameState is a constructor");
  t.ok(typeof state === "object", "state is an instance");
  t.same(state.name, name, "name attribute assigned to instance");
  t.same(state.game, game, "game attribute assigned to instance");
});

test("GameState throws is no name is provided", function (t) {
  t.plan(4);  
  t.throws(function () {
    new GameState();
  }, "throws if no name provided");
  t.throws(function () {
    new GameState("");
  }, "throws if empty string provided for name");
  t.throws(function () {
    new GameState(null);
  }, "throws if null provided for name");
  t.throws(function () {
    new GameState(undefined);
  }, "throws if undefined provided for name");
});
