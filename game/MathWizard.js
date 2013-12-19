var inherits = require('util').inherits
  , UserMixin = require('roomba-server').UserMixin

var MathWizard = function (socket, name) {
  UserMixin.call(this, socket, name);
  this.score = 0;
};

inherits(MathWizard, UserMixin);

MathWizard.prototype.serializeState = function () {
  return {
    id: this.id,
    name: this.name,
    score: this.score
  };
};

module.exports = MathWizard;
