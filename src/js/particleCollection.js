/*global require, module */
// # ParticleCollection
//
// Module representing a collection of Particle objects along with
// convient operations for filtering and accessing the objects.
//
var _ = require('underscore'),
    util = require('./util'),
    prop = util.getProperty,
    Particle = require('./particle'),
    Media = require('./media');
// ## ParticleCollection()
//
// Constructor. This takes the raw API response. Users of the SDK
// should use a factory method rather than calling this directly.
//
function ParticleCollection(data) {
  this._data = _.map(data, function (p) {
    return Object.freeze(new Particle(p));
  });
}

// ### Instance Methods
//
ParticleCollection.prototype = {
  // #### length()
  //
  // **returns** *Number* the number of Particles in this ParticleCollection.
  //
  length: function () {
    return this._data.length;
  },

  // #### toArray()
  //
  // **returns** *Array* an array of Particle objects in this
  // ParticleCollection.
  //
  toArray: function () {
    return this._data.slice();
  },

  // #### each()
  //
  // Iterate through the ParticleCollection and call fn on each Particle.
  //
  // + **param** fn A callback which operates on a Particle object.
  //
  each: function (fn) {
    _.each(this._data, fn);
  },

  // #### filter()
  //
  // Filter the ParticleCollection using a function that takes a Media
  // object and returns a boolean. This will create a new
  // ParticleCollection containing only Particle objects for which this
  // function returned a truthy value.
  //
  // + **param** fn function that takes a Particle object and returns a boolean.
  //
  // **returns** *ParticleCollection* new ParticleCollection containing all
  // Particle objects for which fn returned true.
  //
  filter: function (fn) {
    return new ParticleCollection(
      _.chain(this._data)
        .filter(fn)
        .map(function (p) {return p.asObject(); })
        .value()
    );
  },

  // #### filterByProvider()
  //
  // Do a case insensitive search of Particles in this
  // ParticleCollection and filter by comparing the string to each
  // Particle's provider name.
  //
  // + **param** name string name of the provider to match against.
  //
  // **returns** *ParticleCollection* a new ParticleCollection filtered by provider name.
  //
  filterByProvider: function (name) {
    return this.filter(function (p) {
      return new RegExp(name, "i").test(p.provider().name);
    });
  },

  // #### filterByMedia()
  //
  // Filter Particles in this ParticleCollection by their
  // MediaCollections. This will create a new ParticleCollection
  // containing only Particle objects for which this function
  // returned non-empty MediaCollections after being tested on each
  // Media object in each Particle's MediaCollection.
  //
  // + **param** fn a function that fn is a function that tests against
  // Media objects.
  //
  // **returns** *ParticleCollection* new ParicleCollection where every
  // Particle contains at least one Media object m where fn(m)
  // returned true.
  //
  filterByMedia: function (fn) {
    return new ParticleCollection(
      _.chain(this._data)
        .filter(function (p) {
          var m = p.media().filter(fn);
          return m.length() > 0;
        })
        .map(function (p) {return p.asObject(); })
        .value()
    );
  },

  // #### withMediaLargerThan()
  //
  // Filter for Particles with at least one Media which is larger
  // than the given dimensions in pixels.
  //
  // + **param** w width in pixels
  // + **param** h height in pixels
  //
  // **returns** *ParticleCollection* new ParicleCollection where every
  // Particle contains at least one Media object with width larger
  // than w, and height larger than h.
  //
  withMediaLargerThan: function (w, h) {
    return this.filter(function (p) { 
      return p.media().largerThan(w, h).length() > 0; 
    });
  },

  // #### withMediaSmallerThan()
  //
  // Filter for Particles with at least one Media which is smaller
  // than the given dimensions in pixels.
  //
  // + **param** w width in pixels
  // + **param** h height in pixels
  //
  // **returns** *ParticleCollection* new ParicleCollection where every
  // Particle contains at least one Media object with width smaller
  // than w, and height larger than h.
  withMediaSmallerThan: function (w, h) {
    return this.filter(function (p) { 
      return p.media().smallerThan(w, h).length() > 0; 
    });
  },

  // #### withMediaWithin()
  //
  // Filter for Particles with at least one Media which is within
  // the given dimensions in pixels.
  //
  // + **param** minW minimum width in pixels
  // + **param** minH minimum height in pixels
  // + **param** maxW maximum width in pixels
  // + **param** maxH maximum height in pixels
  //
  // **returns** *ParticleCollection* new ParicleCollection where every
  // Particle contains at least one Media object with width >=
  // minW, height >= minH, width <= maxW, and height <= maxH.
  //
  withMediaWithin: function (minW, minH, maxW, maxH) {
    return this.filter(function (p) {
      return p.media().within(minW, minH, maxW, maxH).length() > 0; 
    });
  },

  // #### map()
  //
  // Iterate through all Particle objects in this ParticleCollection
  // and return an array containing the results of calling fn on
  // each.
  //
  // + **param** fn function that operates on a Particle Object.
  //
  // **returns** *Array* array containing the results of performing fn
  // on each Particle object in this ParticleCollection.
  //
  map: function(fn) {
    return _.map(this._data, fn);
  },

  // #### first()
  //
  // **returns** *Particle* the first Particle object
  //
  first: function () {
    if (this._data.length)
      return this._data[0];
    else
      return undefined;
  },

  // #### last()
  //
  // **returns** *Particle* the last Particle object
  //
  last: function () {
    return this._data.slice(-1).pop();
  },
  
  // #### tail()
  //
  // **returns** *ParticleCollection* a new ParticleCollection
  // containing all the Particle in this ParticleCollection,
  // excuding the first.
  //
  tail: function () {
    return new ParticleCollection(
      _.map(this._data.slice(1), function (p) { return p.asObject(); })
    );
  }
};

module.exports = ParticleCollection;
