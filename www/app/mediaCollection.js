/*global define */
// # MediaCollection
// Module representing a collection of Media objects along with
// convient operations for filtering and accessing the objects.
define(function (require) {
  var _ = require('underscore'),
      util = require('./util'),
      prop = util.getProperty,
      Media = require('./media');
  
  // ## MediaCollection()
  //
  // Constructor. This takes the raw API response. Users of the SDK
  // should use a factory method rather than calling this directly.
  function MediaCollection(data) {
    this._data = _.map(data, function (m) {
      return Object.freeze(new Media(m));
    });
  }

  // ### Instance methods
  MediaCollection.prototype = {
    // #### smallerThan()
    //
    // + **param** w width in pixels
    // + **param** h height in pixels
    //
    // **returns** *MediaCollection* with all Media objects which are smaller than
    // given dimensions.
    smallerThan: function (w, h) {
      return new MediaCollection(
        _.chain(this._data)
          .filter(function(m) { return m.width() < w && m.height() < h;})
          .map(function (m) { return m.asObject(); })
          .value()
      );
    },

    // #### largerThan()
    //
    // + **param** w width in pixels
    // + **param** h height in pixels
    //
    // **returns** *MediaCollection* with all Media objects which are larger than
    // given dimensions.
    largerThan: function (w, h) {
      return new MediaCollection(
        _.chain(this._data)
          .filter(function(m) { return m.width() > w && m.height() > h;})
          .map(function (m) { return m.asObject(); })
          .value()
      );
    },

    // #### within()
    //
    // + **param** minW minimum width in pixels
    // + **param** minH minimum height in pixels
    // + **param** maxW maximum width in pixels
    // + **param** maxH maximum height in pixels
    //
    // **returns** *MediaCollection* with all Media objects within min and max dimensions
    within: function (minW, minH, maxW, maxH) {
      return new MediaCollection(
        _.chain(this._data)
          .filter(function(m) { 
            return m.width()  >= minW && 
                   m.height() >= minH &&
                   m.width()  <= maxW && 
                   m.height() <= maxH;})
          .map(function (m) { return m.asObject(); })
          .value()
      );
    },

    // #### length()
    //
    // **returns** *Number* the number of media objects in this
    // MediaCollection.
    length: function () {
      return this._data.length;
    },

    // #### toArray()
    //
    // **returns** *Array* an array of Media objects in this
    // MediaCollection.
    toArray: function () {
      return this._data.slice();
    },

    // #### each()
    //
    // Iterate through the MediaCollection and call fn on each Media.
    //
    // + **param** fn A callback which operates on a Media object.
    each: function(fn) {
      _.each(this._data, fn);
    },

    // #### filter()
    //
    // Filter the MediaCollection using a function that takes a Media
    // object and returns a boolean. This will create a new
    // MediaCollection containing only Media objects for which this
    // function returned a truthy value.
    //
    // + **param** fn function that takes a Media object and returns a boolean.
    //
    // **returns** *MediaCollection* new MediaCollection containing all
    // Media objects for which fn returned true.
    filter: function(fn) {
      return new MediaCollection(
        _.chain(this._data)
          .filter(fn)
          .map(function (m) { return m.asObject(); })
          .value()
      );
    },

    // #### map()
    //
    // Iterate through all Media objects in this MediaCollection and
    // return an array containing the results of calling fn on each.
    //
    // + **param** fn function that operates on a Media Object.
    //
    // **returns** *Array* array containing the results of performing fn
    // on each Media object in this MediaCollection.
    map: function(fn) {
      return _.map(this._data, fn);
    },

    // #### first()
    //
    // **returns** *Media* the first media object
    first: function () {
      if (this._data.length)
        return this._data[0];
      else
        return undefined;
    },

    // #### last()
    //
    // **returns** *Media* the last media object
    last: function () {
      return this._data.slice(-1).pop();
    },
    
    // #### tail()
    //
    // **returns** *MediaCollection* a new MediaCollection containing all
    // the Media in this MediaCollection, excuding the first.
    tail: function () {
      return new MediaCollection(
        _.map(this._data.slice(1), function (m) { return m.asObject(); })
      );
    }
  };
  
  return MediaCollection;
});
