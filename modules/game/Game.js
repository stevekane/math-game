var _ = require('lodash')
  , throwIf = require('power-throw').throwIf
  , throwUnless = require('power-throw').throwUnless;

var slice = Function.prototype.call.bind(Array.prototype.slice);

var Game = function (room, clock) {
  this.room = room; 
  this.clock = clock;
  this.states = [];
  this.activeState = null;
};

Game.prototype = Object.create({});

/**
Send is used to send events by name to the currently activeState

If the activeState has a method by the provided name, it is called
with the provided arguments

If the activeState does NOT have a method by the provided name, we then
check for this method on ourselves (the game object).  If it exists, we 
call it.

If the game object also does not have a function by the provided name,
we throw an error and cry a lot and whine and make a big fuss.
*/
Game.prototype.send = function (name) {
  var args = slice(arguments, 1);

  throwIf("must provide name of function!", typeof name !== "string" || name === "");
  throwIf("no active state!", this.activeState === null);

  if (typeof this.activeState[name] === "function") {
    this.activeState[name].apply(this.activeState, args);
  } else if (typeof this[name] === "function") {
    this[name].apply(this, args); 
  } else {
    throw new Error("Nothing handled the event " + name);
  }
  return this;
};

Game.prototype.addState = function (state) {
  var stateByThisName = _.some(this.states, {name: state.name});

  throwIf("Already a state with name " + state.name, stateByThisName);
  this.states.push(state); 
  state.game = this;
  return this;
};

Game.prototype.removeStateByName = function (name) {
  var targetState = _.find(this.states, {name: name});

  _.remove(this.states, targetState);
  targetState.game = null;
  return this;
};

Game.prototype.removeState = function (state) {
  _.remove(this.states, state);
  state.game = null;
  return this;
};

/**
called to initial an activeState change:
throw if provided name matches no available state's name
if the targetted state IS the current activeState, do nothing
if there is a current activeState, call its exit method
if the targetted state has an enter method, call it
*/
Game.prototype.transitionTo = function (name) {
  var args = slice(arguments, 1)
    , targetState = _.find(this.states, {name: name})
    , oldState = this.activeState;

  throwUnless("No state with name " + name, targetState);
  if (oldState !== targetState) {
    if (oldState && oldState.exit) {
      oldState.exit.apply(oldState); 
    }
    if (targetState.enter) {
      targetState.enter.apply(targetState, args);
    }
    this.activeState = targetState;
  }
  return this;
};

module.exports = Game;
