var Clock = function () {
  this.startTime = null;
  this.stopTime = null;
  this.timeStamp = null;
};

Clock.prototype = Object.create({});

Clock.prototype.getElapsed = function () {
  return this.startTime ? Date.now() - this.startTime : 0;
};

module.exports = Clock;
