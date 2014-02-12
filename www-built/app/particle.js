define([ "require", "./util", "./mediaCollection" ], function(require) {
    var util = require("./util"), prop = util.getProperty, MediaCollection = require("./mediaCollection");
    function Particle(data) {
        this._data = Object.freeze({
            id: prop(data, "oa_particle_id"),
            text: prop(data, "text"),
            tags: prop(data, "tags"),
            provider: prop(data, "source.provider"),
            source: prop(data, "source"),
            artistIds: prop(data, "artist_ids"),
            profane: prop(data, "profane"),
            date: prop(data, "date"),
            media: new MediaCollection(prop(data, "media"))
        });
    }
    return Particle.prototype = {
        id: function() {
            return this._data.id;
        },
        text: function() {
            return this._data.text;
        },
        tags: function() {
            return this._data.tags;
        },
        provider: function() {
            return this._data.provider;
        
},
        source: function() {
            return this._data.source;
        },
        artistIds: function() {
            return this._data.artistIds;
        },
        profane: function() {
            return this._data.profane;
        },
        date: function() {
            return this._data.date;
        },
        media: function() {
            return this._data.media;
        },
        asObject: function() {
            return {
                id: this.id(),
                text: this.text(),
                tags: this.tags(),
                provider: this.provider(),
                source: this.source(),
                artistIds: this.artistIds(),
                profane: this.profane(),
                date: this.date(),
                media: this.media().asObject()
            };
        }
    }, Particle;
});;