var _ = require('underscore');
var FastMap = require('collections/fast-map');
var EntityList = require('entity-list');
var SystemList = require('system-list');

var Engine = function() {
  this.entities = new EntityList([], this);
  this.systems = new SystemList([], {
    compare: function(a, b) {return a.priority - b.priority;}
  }, this);
  this.nodes = new FastMap();
};

_.extend(Engine.prototype, {

  update: function(time) {
    this.systems.forEach(function(system) {
      if (!system.process) {return;}
      system.update(time);
    });
  },

  getNodes: function(target) {
    var nodes = this.nodes.get(target) || [];
    if (nodes.length) {
      return nodes;
    }
    this.entities.forEach(function(entity) {
      var node = {};
      _.each(_.pairs(target), function(pair) {
        var key = pair[0];
        var value = pair[1];
        if (!node) {return;}
        if (_.isUndefined(value)) {
          throw new Error('Unknown Component ' + key);
        }
        var component = entity.get(value.type);
        if (component) {
          node[key] = component;
        } else {
          node = null;
        }
      });
      if (node) {
        nodes.push(node);
      }
    });
    this.nodes.set(target, nodes);
    return nodes;
  }

});

module.exports = Engine;
