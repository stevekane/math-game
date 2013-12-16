var _ = require('lodash')
  , GameState = require('./../../../modules/game/GameState');

var Loading = function (name) {
  this.name = name || "loading";
};

Loading.prototype = Object.create(GameState.prototype);

_.extend(Loading.prototype, {

  enter: function () {
    console.log("client is loading..."); 
  }, 
});

module.exports = Loading;
