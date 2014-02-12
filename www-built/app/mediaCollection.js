define([ "require", "underscore", "./util", "./media" ], function(require) {
    var _ = require("underscore"), util = require("./util"), prop = util.getProperty, Media = require("./media");
    function MediaCollection(data) {
        this._data = _.map(data, function(m) {
            return Object.freeze(new Media(m));
        });
    }
    return MediaCollection.prototype = {
        smallerThan: function(w, h) {
            return new MediaCollection(_.chain(this._data).filter(function(m) {
                return m.width() < w && m.height() < h;
            }).map(function(m) {
                return m.asObject();
            }).value());
        },
        largerThan: function(w, h) {
            return new MediaCollection(_.chain(this._data).filter(function(m) {
                return m.width() > w && m.height() > h;
            }).map(function(m) {
                return m.asObject();
            }).value());
        },
        within: function(minW, minH, maxW, maxH) {
            
return new MediaCollection(_.chain(this._data).filter(function(m) {
                return m.width() >= minW && m.height() >= minH && m.width() <= maxW && m.height() <= maxH;
            }).map(function(m) {
                return m.asObject();
            }).value());
        },
        widest: function() {
            var widest = this.first();
            return this.tail().each(function(m) {
                m.width() > widest.width() && (widest = m);
            }), widest;
        },
        tallest: function() {
            var tallest = this.first();
            return this.tail().each(function(m) {
                m.tallest() > tallest.height() && (tallest = m);
            }), tallest;
        },
        length: function() {
            return this._data.length;
        },
        toArray: function() {
            return this._data.slice();
        },
        each: function(fn) {
            _.each(this._data, fn);
        },
        filter: function(fn) {
            return new 
MediaCollection(_.chain(this._data).filter(fn).map(function(m) {
                return m.asObject();
            }).value());
        },
        map: function(fn) {
            return _.map(this._data, fn);
        },
        first: function() {
            return this._data.length ? this._data[0] : undefined;
        },
        last: function() {
            return this._data.slice(-1).pop();
        },
        tail: function() {
            return new MediaCollection(_.map(this._data.slice(1), function(m) {
                return m.asObject();
            }));
        }
    }, MediaCollection;
});;