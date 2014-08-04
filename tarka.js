var _ = require('underscore');
var Events = require('backbone-events-standalone');
var Screen = require('./screen');
var Engine = require('./engine');
var extend = require('./utils/extend');


var Tarka = function(initial, options) {
  this.engine = initial.engine ? initial.engine : null;
  this.screen = initial.screen ? initial.screen : null;
  this.options = options || {};
  this.running = false;
  this.elapsed = 0;
};

Tarka.extend = extend;
Events.mixin(Tarka.prototype);

_.extend(Tarka.prototype, {

  start: function() {
    if (!this.screen) {throw 'No screen to render to.';}
    if (!this.engine) {throw 'No engine to render from.';}
    this.running = true;
    var run = _.wrap(_.bind(this.update, this), _.bind(function(update) {
      if (!this.running) {return;}
      var time;
      var delay;
      var remaining;
      var start;
      var end;
      start = new Date().getTime();
      update.apply(this, Array.prototype.slice.call(arguments, 1));
      end = new Date().getTime();
      this.elapsed = end - start;
      if (this.options.frameLength) {
        remaining = this.options.frameLength - this.elapsed;
        time = (
          this.elapsed < this.options.frameLength ?
          this.options.frameLength :
          this.elapsed
        ) / 1000;
        delay = remaining < 0 ? 0 : remaining;
      } else {
        time = this.elapsed / 1000;
        delay = 0;
      }
      _.delay(run, delay, time);
    }, this));
    run(0);
    return this;
  },

  setScreen: function(canvas) {
    this.screen = new Screen(canvas);
    return this;
  },

  setEngine: function(options) {
    this.engine = new Engine(engine);
    return this;
  },

  render: function() {
    this.start();
    this.stop();
    return this;
  },

  stop: function() {
    this.running = false;
    return this;
  },

  update: function(time) {
    this.engine.update(time);
    this.screen.render(this.engine.entities);
    this.trigger('update', this);
  },

  fps: function() {
    if (!this.running) {return 0;}
    return this.elapsed < this.options.frameLength ?
      1000 / this.options.frameLength :
      this.elapsed ? 1000 / this.elapsed : 0;
  }

});

module.exports = Tarka;
