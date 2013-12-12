var _ = require('lodash')
  , throwIf = require('./../utils/exceptions').throwIf
  , throwUnless = require('./../utils/exceptions').throwUnless
  , nonEmptyString = require('./../utils/exceptions').nonEmptyString;

var Game = function (cloak) {
  this.cloak = cloak; 
  this.states = [];
  this.activeState = null;
};

Game.prototype = Object.create({});

Game.prototype.send = function (name, data) {
  throwIf("must provide name of function!", typeof name !== "string" || name === "");
};

Game.prototype.addState = function (state) {
  var stateByThisName = _.some(this.states, {name: state.name});

  throwIf("Already a state with name " + name, stateByThisName);
  this.states.push(state); 
  return this;
};

Game.prototype.removeStateByName = function (name) {
  _.remove(this.states, {name: name});
  return this;
};

module.exports = Game;
