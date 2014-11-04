var _ = require('underscore');
var extend = require('ampersand-class-extend');


var Component = function(data, config) {
  this.id = _.uniqueId(this.constructor.type);
  this.initialize.call(this, data, config);
};

Component.extend = extend;
Component.type = 'component';

_.extend(Component.prototype, {

});

Component.extend = extend;

module.exports = Component;
