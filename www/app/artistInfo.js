/*global define */
// # ArtistInfo
//
// Module representing a collection of Particle objects along with
// convient operations for filtering and accessing the objects.
define(function (require) {
  var $ = require('jquery'),
      _ = require('underscore'),
      util = require('./util'),
      prop = util.getProperty,
      api = require('./api'),
      MediaCollection = require('./mediaCollection');
  
  // ## ArtistInfo()
  //
  // Constructor. This takes the raw API response. Users of the SDK
  // should use a factory method rather than calling this directly.
  function ArtistInfo(data) {
    this._data = Object.freeze({
      oaArtistId: prop(data, "oa_artist_id"),
      name: prop(data, "name"),
      bio: prop(data, "bio.media.0.data.text"),
      coverPhoto: prop(data, "cover_photo.0.media") || prop(data, "cover_photo"),
      factCard: prop(data, "fact_card.media.0.data") || prop(data, "fact_card"),
      profilePhoto: new MediaCollection(prop(data, "profile_photo.media") || prop(data, "profile_photo")),
      styleTags: prop(data, "tags.media.0.data.tags") || prop(data, "style_tags")
    });
  }

  // ### Instance Methods 
  ArtistInfo.prototype = {
    // #### oaArtistId()
    //
    // Accessor for oa_artist_id
    //
    // **returns** *Number*
    oaArtistId: function ()   { return this._data.oaArtistId; },
    // #### name()
    // Accessor for artist name
    //
    // **returns** *String*
    name: function ()         { return this._data.name; },
    // #### bio()
    // Accessor for artist bio
    //
    // **returns** *Particle*
    bio: function ()          { return this._data.bio; },
    // #### coverPhotos()
    // Accessor for artist cover photos
    //
    // **returns** *ParticleCollection*
    coverPhoto: function ()   { return this._data.coverPhoto; },
    // #### factCard()
    // Accessor for artist fact card
    //
    // **returns** *Particle*
    factCard: function ()     { return this._data.factCard; },
    // #### profilePhoto()
    // Accessor for artist profile photo
    //
    // **returns** *Particle*
    profilePhoto: function () { return this._data.profilePhoto; },
    // #### styleTags()
    // Accessor for artist style tags
    //
    // **returns** *Particle*
    styleTags: function ()    { return this._data.styleTags; },

    // #### asObject()
    // copy the data into an object for convenience
    //
    // **returns** *Object*
    asObject: function () {
      return {
        oa_artist_id:   this.oaArtistId(),
        name:         this.name(),
        bio:          this.bio(),
        cover_photo:   this.coverPhoto(),
        fact_card:     this.factCard(),
        profile_photo: this.profilePhoto(),
        style_tags:    this.styleTags()
      };
    }
  };

  // ### ArtistInfo.api()
  //
  // Accessor to api
  ArtistInfo.api = function () {
    return api;
  };

  // ### ArtistInfo.fetchByOaArtistId()
  //
  // Factory method which constructs an instance for an OpenAura
  // artist id and passes it to the given callback
  //
  // + **param** id OpenAura artist id (int).
  // + **param** cb Callback. Is passed an AristInfo for the artist
  //
  // **returns** *jQuery.Deferred*
  ArtistInfo.fetchByOaArtistId = function (id, cb) {
    return api.infoRequest('artists/' + id, {id_type: "oa:artist_id"}, function(status, data) {
      cb(new ArtistInfo(data));
    });
  };

  // ### ArtistInfo.fetchByMbGid()
  //
  // Factory method which constructs an instance for a given Musicbrainz GID
  // and passes it to the given callback
  //
  // + **param** id Musicbrainz GID.
  // + **param** cb Callback. Is passed an AristInfo for the artist
  //
  // **returns** *jQuery.Deferred*
  ArtistInfo.fetchByMbGid = function (id, cb) {
    return api.infoRequest('artists/' + id, {id_type: "musicbrainz:gid"}, function(status, data) {
      cb(new ArtistInfo(data));
    });
  };


  // ### ArtistInfo.fetchByAnchorId()
  //
  // Factory method which constructs an instance for a given OpenAura anchor id
  // and passes it to the given callback
  //
  // + **param** id OpenAura Anchor ID (12-byte hexadecimal).
  // + **param** cb Callback. Is passed an AristInfo for the artist
  // 
  // **returns** *jQuery.Deferred*
  ArtistInfo.fetchByAnchorId = function (id, cb) {
    return api.infoRequest('artists/' + id, {id_type: "oa:anchor_id"}, function(status, data) {
      cb(new ArtistInfo(data));
    });
  };
 
  return ArtistInfo;
});
