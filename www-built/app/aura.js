define([ "require", "jquery", "underscore", "./util", "./api", "./particle", "./particleCollection", "./mediaCollection", "./media" ], function(require) {
    var $ = require("jquery"), _ = require("underscore"), util = require("./util"), api = require("./api"), prop = util.getProperty, Particle = require("./particle"), ParticleCollection = require("./particleCollection"), MediaCollection = require("./mediaCollection"), Media = require("./media");
    function Aura(data) {
        this._data = Object.freeze({
            particleCount: prop(data, "total_particles"),
            nextParticleSet: prop(data, "next_particles"),
            particles: new ParticleCollection(prop(data, "particles"))
        });
    }
    return Aura.prototype = {
        particleCount: function() {
            return this._data.particleCount;
        },
        anchor: function() {
            return this._data.anchor;
        },
        nextParticleSet: function() {
            return this._data.nextParticleSet
;
        },
        particles: function() {
            return this._data.particles;
        }
    }, Aura.api = function() {
        return api;
    }, Aura.fetchByOaArtistId = function(id, cb) {
        return api.streamRequest("artists/" + id, {
            id_type: "oa:artist_id"
        }, function(status, data) {
            cb(new Aura(data));
        });
    }, Aura.fetchByMbGid = function(id, cb) {
        return api.streamRequest("artists/" + id, {
            id_type: "musicbrainz:gid"
        }, function(status, data) {
            cb(new Aura(data));
        });
    }, Aura.fetchByAnchorId = function(id, cb) {
        return api.streamRequest("artists/" + id, {
            id_type: "oa:anchor_id"
        }, function(status, data) {
            cb(new Aura(data));
        });
    }, Aura;
});;