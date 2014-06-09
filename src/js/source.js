/*global require, module */
// # Source
//
// Module represnting a source, which is the fundamental unit of
// content in the OpenAura system.
var util  = require('./util'),
    prop  = util.getProperty,
    api = require('./api');

// ## Source()
//
// Constructor. This takes the raw API response. Users of the SDK
// should use a factory method rather than calling this directly.  
function Source(data) {
  this._data = Object.freeze({
    id: prop(data, "source_id"),
    handle: prop(data, "handle"),
    uid: prop(data, "uid"),
    providerId: prop(data, "provider_id"),
    providerName: prop(data, "provider_name"),
    providerUrl: prop(data, "provider_url"),
    totalParticles: prop(data, "particle_stats.particle_count") || prop(data, "total_particles"),
    textParticleCount: prop(data, "particle_stats.text_count") || prop(data, "text_particle_count"),
    imageParticleCount: prop(data, "particle_stats.image_count") || prop(data, "image_particle_count"),
    videoParticleCount: prop(data, "particle_stats.video_count") || prop(data, "video_particle_count")
  });
}

Source.prototype = {
  // #### id()
  // Accessor for source id.
  //
  // **returns** *Number* an integer.
  id: function () { return this._data.id; },

  // #### name()
  // Accessor for source name.
  //
  // **return** *String*
  name: function () { return this._data.name; },

  // #### uid()
  // Accessor for the source uid
  // 
  // **returns** *String*
  uid: function () { return this._data.uid; },

  // #### handle()
  // Accessor for the source handle
  // 
  // **returns** *String*
  handle: function () { return this._data.handle; },

  // #### providerId()
  // Accessor for the source's provider's id
  // 
  // **returns** *String*
  providerId: function () { return this._data.providerId; },

  // #### providerName()
  // Accessor for the source's provider's name
  // 
  // **returns** *String*
  providerName: function () { return this._data.providerName; },

  // #### providerUrl()
  // Accessor for the provider's url
  // 
  // **returns** *String*
  providerUrl: function () { return this._data.providerUrl; },

  // #### totalParticles()
  // Accessor for the total number of particles from this source.
  // 
  // **returns** *Number*
  totalParticles: function () { return this._data.totalParticles; },

  // #### textParticleCount()
  // Accessor for the number of text particles from this source.
  // 
  // **returns** *Number*
  textParticleCount: function () { return this._data.textParticleCount; },

  // #### imageParticleCount()
  // Accessor for the number of image particles from this source.
  // 
  // **returns** *Number*
  imageParticleCount: function () { return this._data.imageParticleCount; },

  // #### videoParticleCount()
  // Accessor for the number of video particles from this source.
  // 
  // **returns** *Number*
  videoParticleCount: function () { return this._data.videoParticleCount; },

  // #### asObject()
  //
  // **returns** *Object* a plain JS Object with a copy of the data
  // contained in this Particle object.
  asObject: function () {
    return {
      id: this.id(),
      name: this.name(),
      uid: this.uid(),
      handle: this.handle(),
      provider_id: this.providerId(),
      provider_name: this.providerName(),
      provider_url: this.providerUrl(),
      total_particles: this.totalParticles(),
      text_particle_count: this.textParticleCount(),
      image_particle_count: this.imageParticleCount(),
      video_particle_count: this.videoParticleCount()
    };
  }
};

// ### Source.api()
//
// Accessor to api
Source.api = function () {
  return api;
};

// ### Source.fetchByOaSourceId()
//
// Factory method which constructs an instance for a given OpenAura source id
// and passes it to the given callback
//
// + **param** id OpenAura Source ID (int).
// + **param** cb Callback. Is passed an AristInfo for the artist
// 
// **returns** *jQuery.Deferred*
Source.fetchByAnchorId = function (id, cb) {
  return api.infoRequest('sources/' + id, {id_type: "oa:source_id"}, function(status, data) {
    cb(new Source(data));
  });
};

module.exports = Source;
