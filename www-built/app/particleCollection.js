define([ "require", "underscore", "./util", "./particle", "./media" ], function(require) {
    var _ = require("underscore"), util = require("./util"), prop = util.getProperty, Particle = require("./particle"), Media = require("./media");
    function ParticleCollection(data) {
        this._data = _.map(data, function(p) {
            return Object.freeze(new Particle(p));
        });
    }
    return ParticleCollection.prototype = {
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
            return new ParticleCollection(_.chain(this._data).filter(fn).map(function(p) {
                return p.asObject();
            }).value());
        },
        filterByProvider: function(name) {
            return this.filter(function(p) {
                return (new RegExp(name, "i")
).test(p.provider().name);
            });
        },
        filterByMedia: function(fn) {
            return new ParticleCollection(_.chain(this._data).filter(function(p) {
                var m = p.media().filter(fn);
                return m.length() > 0;
            }).map(function(p) {
                return p.asObject();
            }).value());
        },
        withMediaLargerThan: function(w, h) {
            return this.filter(function(p) {
                return p.media().largerThan(w, h).length() > 0;
            });
        },
        withMediaSmallerThan: function(w, h) {
            return this.filter(function(p) {
                return p.media().smallerThan(w, h).length() > 0;
            });
        },
        withMediaWithin: function(minW, minH, maxW, maxH) {
            return this.filter(function(p) {
                return p.media().within(minW, minH, maxW, maxH).length() > 0;
            });
        },
        map: function(fn) {
            return _.map(this._data
, fn);
        },
        first: function() {
            return this._data.length ? this._data[0] : undefined;
        },
        last: function() {
            return this._data.slice(-1).pop();
        },
        tail: function() {
            return new ParticleCollection(_.map(this._data.slice(1), function(p) {
                return p.asObject();
            }));
        }
    }, ParticleCollection;
});;