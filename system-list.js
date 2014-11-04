var _ = require('underscore');
var SortedArray = require('collections/sorted-array');


var SystemList = function(values, options, engine) {
  this.engine = engine;
  SortedArray.apply(this, [
    values,
    options.equals,
    options.compare,
    options.getDefault
  ]);
};

_.extend(SystemList, SortedArray);


SystemList.prototype = (function(Prototype) {
  Prototype.prototype = SortedArray.prototype;
  return new Prototype();
})(function() {});


SystemList.prototype.constructor = SortedArray;

_.extend(SystemList.prototype, {

  add: function(value) {
    return SortedArray.prototype.add.apply(this, arguments);
  },

  delete: function(value) {
    return SortedArray.prototype.delete.apply(this, arguments);
  }

});

module.exports = SystemList;
