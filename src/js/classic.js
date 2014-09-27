/*global require, module */
// # Classic
// Literally, the easiest thing that works. Get basic artist info easily.
var $ = require('jquery'),
    _ = require('underscore'),
    util  = require('./util'),
    api = require('./api'),
    prop  = util.getProperty;

// ## Classic()
// 
// Constructor for Classic Info. Takes raw JSON returned by the API. In
// general, you should use one of the provided factory methods
// instead of accessing the constructor directly.
function Classic(data) {
  console.dir(data);
  this._data = Object.freeze({
    responseMetadata: prop(data, "response_metadata"),
    name: prop(data, "name"),
    musicbrainzGid: prop(data, "musicbrainz_gid"),
    associatedActs: prop(data, "associated_acts"),
    birthname: prop(data, "birthname"),
    birthplace: prop(data, "birthplace"),
    labels: prop(data, "labels"),
    locationFormed: prop(data, "location_formed"),
    website: prop(data, "website"),
    bio: prop(data, "bio"),
    profileImage: prop(data, "profile_image"),
    profileAltSizes: prop(data, "profile_alt_sizes"),
    artistImages: prop(data, "artist_images")
  });
}

// ### Instance methods
Classic.prototype = {
  responseMetadata: function () { return this._data.responseMetadata; },
  name: function () { return this._data.name; },
  musicbrainzGid: function () { return this._data.musicbrainzGid; },
  associatedActs: function () { return this._data.associatedActs; },
  birthname: function() { return this._data.birthname; },
  birthplace: function() { return this._data.birthplace; },
  labels: function() { return this._data.labels; },
  locationFormed: function() { return this._data.locationFormed; },
  website: function() { return this._data.website; },
  bio: function() { return this._data.bio; },
  profileImage: function() { return this._data.profileImage; },
  profileAltSizes: function() { return this._data.profileAltSizes; },
  artistImages: function() { return this._data.artistImages; },

  
  // #### asObject()
  //
  // **returns** *Object* a plain JS Object with a copy of the data
  // contained in this Media object.
  asObject: function () {
    return {
      response_metadata: this.responseMetadata(),
      name: this.name(),
      musicbrainz_gid: this.musicbrainzGid(),
      associated_acts: this.associatedActs(),
      birthname: this.birthname(),
      birthplace: this.birthplace(),
      labels: this.labels(),
      location_formed: this.locationFormed(),
      website: this.website(),
      bio: this.bio(),
      profile_image: this.profileImage(),
      profile_alt_sizes: this.profileAltSizes(),
      artist_images: this.artistImages()
    };
  }
};

// ### Aura.api()
//
// Accessor to api
Classic.api = function () {
  return api;
};

// ### Classic.fetchByOaArtistId()
//
// Factory method for Classic found by OpenAura artist id.
//
// + **param** id OpenAura artist id (int).
// + **param** cb Callback. Is passed an Aura for the artist.
//
// **returns** *jQuery.Deffered*
Classic.fetchByOaArtistId = function (id, cb) {
  return api.classicRequest('artists/' + id, {id_type: "oa:artist_id"}, function(status, data) {
    cb(new Classic(data));
  });
};

module.exports = Classic;
