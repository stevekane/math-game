var _ = require('lodash')
  , test = require('tape')
  , Game = require('./Game');

test("Game is a constructor", function (t) {
  var room = {}
    , clock = {}
    , game = new Game(room, clock);

  t.plan(4);
  t.ok(typeof Game === "function", "Game is a constructor");
  t.ok(typeof game === "object", "state is an instance");
  t.same(game.room, room, "room attribute assigned to instance");
  t.same(game.clock, clock, "clock attribute assigned to instance");
});

//#send
test("Game.send should throw if name is not a non-empty string", function (t) {
  var game = new Game();
  game.func = function () {};
  game
    .addState({name: "test"})
    .transitionTo("test");

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

test(
"Game.send should fire an a specified function on the Game instance if " +
"no function by that name is found on the activeState", 
function (t) {
  t.plan(2);
  var game = new Game()
    , arg1 = "testArg"
    , arg2 = "anotherArg"
    , state = {
      name: "test"
    };

  game.func = function (first, second) {
    t.same(first, "testArg", "first argument called in game method func");
    t.same(second, "anotherArg", "second argument called in game method func");
  };
  game
    .addState({name: "test"})
    .transitionTo("test")
    .send("func", arg1, arg2);
});

test("Game.send should throw if neither the activeState or game instance has the named method", 
function (t) {
  t.plan(2);
  var game = new Game()
    , arg1 = "testArg"
    , arg2 = "anotherArg"
    , state = {
      name: "test"
    };

  game
    .addState({name: "test"})
    .transitionTo("test");

  t.throws(function () {
    game.send("notthere"); 
  });
  t.throws(function () {
    game.send("alsonotthere"); 
  });
});

test("Game.send should fire a specificed function name with arguments", function (t) {
  t.plan(3);

  var game = new Game()
    , arg1 = "testArg"
    , arg2 = "bestArg"
    , state = {
      name: "test",
      testfunc: function (arg1, arg2) {
        t.same(this, state, "this argument is the state itself");
        t.same(arg1, "testArg", "argument 1 passed correctly to function via send");
        t.same(arg2, "bestArg", "argument 2 passed correctly to function via send");
      }
    }

  game
    .addState(state)
    .transitionTo("test")
    .send("testfunc", arg1, arg2);
});

//#addState
test("Game.addState should throw if a state provided name already exists", function (t) {
  t.plan(2);
  var game = new Game()
    , state1 = { name: "test" }
    , state2 = { name: "test" }
    , state3 = { name: "another" };
    
  game.addState(state1);
  t.throws(function () {
    game.addState(state2); 
  }, "addState throws if the states name already is taken");
  t.doesNotThrow(function () {
    game.addState(state3); 
  }, "addState does not throw if the states name isnt taken");
});

test("Game.addState should add the provided states to its states",
function (t) {
  t.plan(4);
  var game = new Game()
    , state1 = { name: "state1" }
    , state2 = { name: "state2" }

  game.addState(state1);
  t.ok(_.contains(game.states, state1), "game.states array contains state1");
  t.ok(game.states.length === 1, "length of game.states array is now 1");

  game.addState(state2);
  t.ok(_.contains(game.states, state2), "game.states array contains state2");
  t.ok(game.states.length === 2, "length of game.states array is now 2");
});

//#removeStateByName
test("Game.removeStateByName should remove the named state from its states",
function (t) {
  t.plan(4);
  var game = new Game()
    , state1 = { name: "state1" }
    , state2 = { name: "state2" }

  game
    .addState(state1)
    .addState(state2)

  game.removeStateByName("state1");
  t.ok(!_.contains(game.states, state1), "state1 removed from game.states");
  t.ok(game.states.length === 1, "length of game.states array is now 1");

  game.removeStateByName("state2");
  t.ok(!_.contains(game.states, state2), "state2 removed from game.states");
  t.ok(game.states.length === 0, "length of game.states array is now 0");
});

//#removeState
test("Game.removeState should remove the state from its states",
function (t) {
  t.plan(4);
  var game = new Game()
    , state1 = { name: "state1" }
    , state2 = { name: "state2" }

  game
    .addState(state1)
    .addState(state2)

  game.removeState(state1);
  t.ok(!_.contains(game.states, state1), "state1 removed from game.states");
  t.ok(game.states.length === 1, "length of game.states array is now 1");

  game.removeState(state2);
  t.ok(!_.contains(game.states, state2), "state2 removed from game.states");
  t.ok(game.states.length === 0, "length of game.states array is now 0");
});

//#transitionTo
test("Game.transitionTo should throw if provided state name isnt an available state", 
function (t) {
  t.plan(2);
  var game = new Game()
    , state1 = { name: "state1" };

  game.addState(state1);
  t.doesNotThrow(function () {
    game.transitionTo("state1"); 
  }, "transitionTo does not throw if the name provided matches an available state");
  t.throws(function () {
    game.transitionTo("state2"); 
  }, "transitionTo throws if the name provided matches no available state");
});

test("Game.transitionTo should change the activeState of the game", function (t) {
  t.plan(1);
  var game = new Game()
    , state1 = { name: "state1" };

  game
    .addState(state1)
    .transitionTo("state1");
   
  t.same(game.activeState, state1, "state1 is now the active state");
});

test(
"Game.transitionTo should call the targetStates enter method if available" +
"Game.transitionTo should call the previous active states exit method if available",
function (t) {
  t.plan(4);
  var game = new Game()
    , arg1 = "firstArg"
    , arg2 = "secondArg";
  var state1 = {
    name: "state1",
    enter: function (first, second) {
      t.ok(true, "the enter function was called");
      t.same(first, arg1, "argument 1 correctly passed to enter function");
      t.same(second, arg2, "argument 2 correctly passed to enter function");
    }
  }
  var state2 = {
    name: "state2",
    exit: function () {
      t.ok(true, "the exit function was called");
    }
  };

  game
    .addState(state1)
    .addState(state2)
    .transitionTo("state2")
    .transitionTo("state1", arg1, arg2);
});

test("Game.transitionTo should emit a 'transition' event with the targetState's name", 
function (t) {
  t.plan(1);
  var game = new Game();
  var state1 = {
    name: "state1",
  };
  var state2 = {
    name: "state2",
  };
  game.on('transition', function (stateName) {
    t.same(stateName, "state2", "game emits transition event with targetState's name");
  });
  game
    .addState(state1)
    .addState(state2)
    .transitionTo("state2")
});

test(
"Game.transitionTo should NOT call the current activeState's exit method OR the" +
"targetted state's enter method if the target state is the current activeState.  it's a no-op",
function (t) {
  t.plan(2);
  var game = new Game()
    , arg1 = "firstArg"
    , arg2 = "secondArg"
    , timesEnterWasCalled = 0
    , timesExitWasCalled = 0;
  var state1 = {
    name: "state1",
    enter: function (first, second) {
      ++timesEnterWasCalled; 
    },
    exit: function () {
      ++timesExitWasCalled;
    }
  }

  game
    .addState(state1)
    .transitionTo("state1")
    .transitionTo("state1", arg1, arg2);

  t.ok(timesEnterWasCalled === 1, "enter called only once since targetState same as activeState");
  t.ok(timesExitWasCalled === 0, "state1.exit never called since targetState same as activeState");
});
