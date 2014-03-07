/*global define */
// # Particle
//
// Module represnting a particle, which is the fundamental unit of
// content in the OpenAura system.
define(function (require) {
  var util  = require('./util'),
      prop  = util.getProperty,
      MediaCollection = require('./mediaCollection');
  // ## Particle()
  //
  // Constructor. This takes the raw API response. Users of the SDK
  // should use a factory method rather than calling this directly.  
  function Particle(data) {
    this._data = Object.freeze({
      id: prop(data, "oa_particle_id"),
      text: prop(data, "text"),
      tags: prop(data, "tags"),
      provider: prop(data, "source.provider"),
      source: prop(data, "source"),
      oaArtistId: prop(data, "oa_artist_id"),
      profane: prop(data, "profane"),
      date: prop(data, "date"),
      media: new MediaCollection(prop(data, "media"))
    });
  }

  // ### Instance methods
  Particle.prototype = {
    // #### id()
    // Accessor for particle id.
    //
    // **returns** *String* a 12-byte hexidecimal id.
    id: function () { return this._data.id; },

    // #### text()
    // Accessor for particle text. Can contain a caption, or in some
    // cases, the actual text.
    //
    // **returns** *String* particle text.
    text: function () { return this._data.text; },

    // #### tags()
    // Accessor for tags.
    //
    // **returns** *Array* string tags associated with this Particle.
    tags: function () { return this._data.tags; },

    // #### provider()
    // Name of the particle's provider (the service from which this
    // Particle was sourced).
    //
    // **returns** *String* name of content provider, eg, Facebook,
    // Twitter, etc.
    provider: function () { return this._data.provider; },

    // #### source()
    // JSON object containing information about the source of this
    // Particle. A source represents not just the provider of the
    // particle, but the specific user account, as well.
    //
    // **returns** *Object* javascript object containing information
    // about this Particle's source.
    source: function () { return this._data.source; },

    // #### artistIds()
    // OpenAura id for related artist.
    //
    // **returns** *Number* integer artist id.
    oaArtistId: function () { console.dir(); return this._data.oaArtistId; },

    // #### profane()
    //
    // **returns** *boolean* true if this particle was flagged by
    // OpenAura's profanity filter.
    profane: function () { return this._data.profane; },

    // #### date()
    // Accessor for particle date.
    //
    // **returns** *String* datetime associated with this Particle.
    date: function () { return this._data.date; },

    // #### media()
    // Accessor for this particle's MediaCollection. Multiple Media
    // objects here are representations of the same media. Ie, this
    // will contain the same image in multiple sizes, or Media which
    // represents a video along with an image thumb for that same
    // video.
    //
    // **returns** *MediaCollection*
    media: function () { return this._data.media; },

    // #### asObject()
    //
    // **returns** *Object* a plain JS Object with a copy of the data
    // contained in this Particle object.
    asObject: function () {
      return {
        id: this.id(),
        text: this.text(),
        tags: this.tags(),
        provider: this.provider(),
        source: this.source(),
        oa_artist_id: this.oaArtistId(),
        profane: this.profane(),
        date: this.date(),
        media: this.media().asObject()
      };
    }
  };
  
  return Particle;
});
