var _ = require('lodash')
  , slice = require('./../utils/array').slice
  , throwIf = require('./../utils/exceptions').throwIf
  , throwUnless = require('./../utils/exceptions').throwUnless;

var Game = function (cloak) {
  this.cloak = cloak; 
  this.states = [];
  this.activeState = null;
};

Game.prototype = Object.create({});

/**
Send is used to send events by name to the currently activeState
If the current state has no method by the provided name, this is the 
end of the road.  If it does, the method will be called with the
provided arguments as arguments.
*/
Game.prototype.send = function (name) {
  var args = slice(arguments, 1);

  throwIf("must provide name of function!", typeof name !== "string" || name === "");
  throwIf("no active state!", this.activeState === null);
  if (typeof this.activeState[name] === "function") {
    this.activeState[name].apply(this.activeState, args);
  }
  return this;
};

Game.prototype.addState = function (state) {
  var stateByThisName = _.some(this.states, {name: state.name});

  throwIf("Already a state with name " + state.name, stateByThisName);
  this.states.push(state); 
  return this;
};

Game.prototype.removeStateByName = function (name) {
  _.remove(this.states, {name: name});
  return this;
};

Game.prototype.removeState = function (state) {
  _.remove(this.states, state);
  return this;
};

Game.prototype.transitionTo = function (name) {
  var args = slice(arguments, 1)
    , targetState = _.find(this.states, {name: name})
    , oldState = this.activeState;

  throwUnless("No state with name " + name, targetState);
  if (targetState.enter) {
    targetState.enter.apply(targetState, args);
  }
  if (oldState && oldState.exit) {
    oldState.exit.apply(oldState); 
  }

  this.activeState = targetState;
  return this;
};

module.exports = Game;
