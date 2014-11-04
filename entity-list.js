var _ = require('underscore');
var ShimArray = require('collections/shim-array');
var FastMap = require('collections/fast-map');


var EntityList = function(values, engine) {
  this.engine = engine;
  ShimArray.apply(this, values);
};

_.extend(EntityList, ShimArray);

EntityList.prototype = (function(Prototype) {
  Prototype.prototype = ShimArray.prototype;
  return new Prototype();
})(function() {});

EntityList.prototype.constructor = ShimArray;

_.extend(EntityList.prototype, {

  add: function(value) {
    this.engine.nodes = new FastMap();
    return ShimArray.prototype.add.apply(this, arguments);
  },

  delete: function(value) {
    this.engine.nodes = new FastMap();
    return ShimArray.prototype.delete.apply(this, arguments);
  }

});

module.exports = EntityList;
