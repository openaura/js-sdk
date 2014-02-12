define([ "require", "jquery", "underscore", "./util", "./api", "./mediaCollection" ], function(require) {
    var $ = require("jquery"), _ = require("underscore"), util = require("./util"), prop = util.getProperty, api = require("./api"), MediaCollection = require("./mediaCollection");
    function ArtistInfo(data) {
        this._data = Object.freeze({
            oaArtistId: prop(data, "oa_artist_id"),
            name: prop(data, "name"),
            bio: prop(data, "bio.media.0.data.text") || prop(data, "bio.text"),
            coverPhoto: new MediaCollection(prop(data, "cover_photo.0.media")),
            factCard: prop(data, "fact_card.media.0.data"),
            profilePhoto: new MediaCollection(prop(data, "profile_photo.media")),
            styleTags: prop(data, "tags.media.0.data.tags")
        });
    }
    return ArtistInfo.prototype = {
        oaArtistId: function() {
            return this._data.oaArtistId;
        },
        name: function() {
            return this._data
.name;
        },
        bio: function() {
            return this._data.bio;
        },
        coverPhoto: function() {
            return this._data.coverPhoto;
        },
        factCard: function() {
            return this._data.factCard;
        },
        profilePhoto: function() {
            return this._data.profilePhoto;
        },
        styleTags: function() {
            return this._data.styleTags;
        },
        asObject: function() {
            return {
                oaArtistId: this.oaArtistId(),
                name: this.name(),
                bio: this.bio(),
                coverPhoto: this.coverPhoto(),
                factCard: this.factCard(),
                profilePhoto: this.profilePhoto(),
                styleTags: this.styleTags()
            };
        }
    }, ArtistInfo.api = function() {
        return api;
    }, ArtistInfo.fetchByOaArtistId = function(id, cb) {
        return api.infoRequest("artists/" + id, {
            id_type: "oa:artist_id"
        
}, function(status, data) {
            cb(new ArtistInfo(data));
        });
    }, ArtistInfo.fetchByMbGid = function(id, cb) {
        return api.infoRequest("artists/" + id, {
            id_type: "musicbrainz:gid"
        }, function(status, data) {
            cb(new ArtistInfo(data));
        });
    }, ArtistInfo.fetchByAnchorId = function(id, cb) {
        return api.infoRequest("artists/" + id, {
            id_type: "oa:anchor_id"
        }, function(status, data) {
            cb(new ArtistInfo(data));
        });
    }, ArtistInfo;
});;