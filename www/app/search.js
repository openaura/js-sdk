/*global define */
// # Aura
// Module representing an Aura. An Aura is a wrapper around a
// collection of particles which are grouped by their relationship
// with an Anchor (basically a noun in our system, eg, Coldplay, Dark
// Side of the Moon, etc.)
define(function (require) {
  var $ = require('jquery'),
      _ = require('underscore'),
      util  = require('./util'),
      api = require('./api'),
      prop  = util.getProperty,
      Particle = require('./particle'),
      ParticleCollection = require('./particleCollection'),
      MediaCollection = require('./mediaCollection'),
      Media = require('./media');
  
  // ## Aura()
  // 
  // Constructor for an Aura. Takes raw JSON returned by the API. In
  // general, you should use one of the provided factory methods
  // instead of accessing the constructor directly.
  function Aura(data) {
    this._data = Object.freeze({
      particleCount: prop(data, "total_particles"),
      nextParticleSet: prop(data, "next_particles"),
      particles: new ParticleCollection(prop(data, "particles"))
    });
  }

  // ### Instance methods
  Aura.prototype = {
    // #### particleCount()
    //
    // Accessor for the number of particles returned.
    //
    // **returns** *Number*
    particleCount: function () { return this._data.particleCount; },
    // #### anchor()
    //
    // Accessor for an associated anchor.
    //
    // **returns** *String*
    anchor: function () { return this._data.anchor; },
    // #### nexParticleSet()
    //
    // Accessor for the URI of the Aura containing the next set of
    // particles.
    //
    // **returns** *String*
    nextParticleSet: function () { return this._data.nextParticleSet; },
    // #### particles()
    //
    // Accessor for the ParticleCollection containing the result set
    // for this Aura.
    //
    // **returns** *ParticleCollection*
    particles: function () { return this._data.particles; }
  };

  // ### Aura.api()
  //
  // Accessor to api
  Aura.api = function () {
    return api;
  };

  // ### Aura.fetchByOaArtistId()
  //
  // Factory method for an Aura found by OpenAura artist id.
  //
  // + **param** id OpenAura artist id (int).
  // + **param** cb Callback. Is passed an Aura for the artist.
  //
  // **returns** *jQuery.Deffered*
  Aura.fetchByOaArtistId = function (id, cb) {
    return api.streamRequest('artists/' + id, {id_type: "oa:artist_id"}, function(status, data) {
      cb(new Aura(data));
    });
  };

  // ### Aura.fetchAuraByMbGid
  //
  // Factory method for an Aura found by Musicbrainz GID.
  //
  // + **param** id Musicbrainz GID.
  // + **param** cb Callback. Is passed an Aura for the artist.
  //
  // **returns** *jQuery.Deferred*
  Aura.fetchByMbGid = function (id, cb) {
    return api.streamRequest('artists/' + id, {id_type: "musicbrainz:gid"}, function(status, data) {
      cb(new Aura(data));
    });
  };

  // ### Aura.fetchAuraByAnchorId()
  // Factory method for an Aura found by OpenAura anchor id.
  //
  // + **param** id OpenAura Anchor ID (12-byte hexadecimal).
  // + **param** cb Callback. Is passed an Aura for the artist.
  //
  // **returns** *jQuery.Deferred*
  Aura.fetchByAnchorId = function (id, cb) {
    return api.streamRequest('artists/' + id, {id_type: "oa:anchor_id"}, function(status, data) {
      cb(new Aura(data));
    });
  };

  return Aura;
});
