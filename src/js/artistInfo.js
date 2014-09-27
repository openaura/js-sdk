/*global require, module */
// # ArtistInfo
//
// Module representing a collection of Particle objects along with
// convient operations for filtering and accessing the objects.
var $ = require('jquery'),
    _ = require('underscore'),
    util = require('./util'),
    prop = util.getProperty,
    api = require('./api'),
    MediaCollection = require('./mediaCollection'),
    ParticleCollection = require('./particleCollection');

// ## ArtistInfo()
//
// Constructor. This takes the raw API response. Users of the SDK
// should use a factory method rather than calling this directly.
function ArtistInfo(data) {
  console.dir(data);
  this._data = Object.freeze({
    oaAnchorId: prop(data, "oa_anchor_id"),
    oaArtistId: prop(data, "oa_artist_id"),
    musicbrainzGid: prop(data, "musicbrainz_gid"),
    requestId: prop(data, "request_id"),
    name: prop(data, "name"),
    bio: prop(data, "bio.media.0.data.text") || prop(data, "bio"),
    coverPhoto: prop(data, "cover_photo.0.media") || prop(data, "cover_photo"),
    factCard: prop(data, "fact_card.media.0.data") || prop(data, "fact_card"),
    profilePhoto: new MediaCollection(prop(data, "profile_photo.media") || prop(data, "profile_photo")),
    //artistImages: new ParticleCollection(prop(data, "artist_images")),
    styleTags: prop(data, "style_tags.media.0.data.tags") || prop(data, "style_tags")
  });
}

// ### Instance Methods 
ArtistInfo.prototype = {
  // #### oaAnchorId()
  //
  // Accessor for oa_anchor_id
  //
  // **returns** *String*
  oaAnchorId: function ()   { return this._data.oaAnchorId; },
  // #### oaArtistId()
  //
  // Accessor for oa_artist_id
  //
  // **returns** *Number*
  oaArtistId: function ()   { return this._data.oaArtistId; },
  // #### musicbrainzGid()
  //
  // Accessor for musicbrainz_gid
  //
  // **returns** *String*
  musicbrainzGid: function ()   { return this._data.musicbrainzGid; },
  // #### requestId()
  //
  // Accessor for request_id
  //
  // **returns** *String*
  requestId: function ()   { return this._data.requestId; },
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
  // **returns** *MediaCollection*
  profilePhoto: function () { return this._data.profilePhoto; },
  // #### styleTags()
  // Accessor for artist style tags
  //
  // **returns** *Particle*
  styleTags: function ()    { return this._data.styleTags; },

  // #### artistImages()
  // Accessor for artist artist images
  //
  // **returns** *Particle*
  artistImages: function ()    { return this._data.artistImages; },

  reportingImageUrl: function () { return api.config()["base_api_url"] +  "/reporting/request/" + this.requestId() + ".gif"; }, 

  // #### asObject()
  // copy the data into an object for convenience
  //
  // **returns** *Object*
  asObject: function () {
    return {
      oa_anchor_id: this.oaAnchorId(),
      oa_artist_id:   this.oaArtistId(),
      musicbrainz_gid: this.musicbrainzGid(),
      request_id: this.requestId(),
      name:         this.name(),
      bio:          this.bio(),
      cover_photo:   this.coverPhoto(),
      fact_card:     this.factCard(),
      profile_photo: this.profilePhoto().asObject(),
      artist_images: this.artistImages().map(function (p) { return p.asObject(); }),
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

module.exports = ArtistInfo;
