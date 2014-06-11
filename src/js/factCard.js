/*global require, module */
// # FactCard
//
// Module representing an artist fact card. This is returned in as
// part of an ArtistInfo object.
var util = require('./util'),
    prop = util.getProperty;

// ## FactCard()
//
// Constructor. This takes the raw API response. Users of the SDK
// should use a factory method rather than calling this directly.
function FactCard(data) {
  this._data = Object.freeze({
    birthname: prop(data, "birthname"),
    birthdate: prop(data, "birthdate"),
    birthplace: prop(data, "birthplace"),
    locationFormed: prop(data, "location_formed"),
    members: prop(data, "members"),
    labels: prop(data, "labels"),
    associatedActs: prop(data, "associated_acts"),
    website: prop(data, "website")
  });
}

// ### Instance methods
FactCard.prototype = {
  // #### birthdate()
  // Accessor for artist birthdate if available.
  //
  // **returns** *String*
  birthdate: function ()   { return this._data.birthdate; },
  // #### birthname()
  // Accessor for artist birthname if available.
  //
  // **returns** *String*
  birthname: function ()   { return this._data.birthname; },
  // #### birthplace()
  // Accessor for artist birthplace if available.
  //
  // **returns** *String*
  birthplace: function ()  { return this._data.birthplace; },
  // #### locationFormed()
  // Accessor for the city/state/country where the band was formed
  // if available.
  //
  // **returns** *String*
  locationFormed: function ()   { return this._data.locationFormed; },
  // #### members()
  // Accessor for band members if available. Returned as an array of
  // objects with member names and information about when they where
  // in the band, if available.
  //
  // **returns** *Array*
  members: function ()   { return this._data.members; },
  // #### labels()
  // Accessor for labels for which the artist has released records.
  //
  // **returns** *Array*
  labels: function ()   { return this._data.labels; },
  // #### associatedActs()
  // Accessor for related artists.
  //
  // **returns** *Array*
  associatedActs: function ()   { return this._data.associatedActs; },
  // #### website()
  // Accessor for artist website.
  //
  // **returns** *String*
  website: function ()   { return this._data.website; }
};

module.exports = FactCard;

