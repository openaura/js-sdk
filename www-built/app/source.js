define([ "require", "./util", "./api" ], function(require) {
    var util = require("./util"), prop = util.getProperty, api = require("./api");
    function Source(data) {
        this._data = Object.freeze({
            id: prop(data, "oa_source_id"),
            handle: prop(data, "handle"),
            uid: prop(data, "uid"),
            providerId: prop(data, "oa_provider_id"),
            providerName: prop(data, "provider_name"),
            providerUrl: prop(data, "provider_url"),
            totalParticles: prop(data, "particle_stats.particle_count"),
            textParticleCount: prop(data, "particle_stats.text_count"),
            imageParticleCount: prop(data, "particle_stats.image_count"),
            videoParticleCount: prop(data, "particle_stats.video_count")
        });
    }
    return Source.prototype = {
        id: function() {
            return this._data.id;
        },
        name: function() {
            return this._data.name;
        },
        uid: function(
) {
            return this._data.uid;
        },
        handle: function() {
            return this._data.handle;
        },
        providerId: function() {
            return this._data.providerId;
        },
        providerName: function() {
            return this._data.providerName;
        },
        providerUrl: function() {
            return this._data.providerUrl;
        },
        totalParticles: function() {
            return this._data.totalParticles;
        },
        textParticleCount: function() {
            return this._data.textParticleCount;
        },
        imageParticleCount: function() {
            return this._data.imageParticleCount;
        },
        videoParticleCount: function() {
            return this._data.videoParticleCount;
        },
        asObject: function() {
            return {
                id: this.id(),
                name: this.name(),
                uid: this.uid(),
                handle: this.handle(),
                providerId
: this.providerId(),
                providerName: this.providerName(),
                providerUrl: this.providerUrl(),
                totalParticles: this.totalParticles(),
                textParticleCount: this.textParticleCount(),
                imageParticleCount: this.imageParticleCount(),
                videoParticleCount: this.videoParticleCount()
            };
        }
    }, Source.api = function() {
        return api;
    }, Source.fetchBySourceId = function(id, cb) {
        return api.infoRequest("sources/" + id, {
            id_type: "oa:source_id"
        }, function(status, data) {
            cb(new Source(data));
        });
    }, Source;
});;