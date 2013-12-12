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

//#send
test("Game.send should throw if name is not a non-empty string", function (t) {
  var game = new Game({});

  t.plan(5);
  t.throws(function () {
    game.send();
  }, "throws if no name provided");
  t.throws(function () {
    game.send("");
  }, "throws if name provided is empty string");
  t.throws(function () {
    game.send(null);
  }, "throws if null is provided");
  t.throws(function () {
    game.send(undefined);
  }, "throws if undefined is provided");

  t.doesNotThrow(function () {
    game.send("func"); 
  }, "does not throw if nonempty string provided for name");
});
