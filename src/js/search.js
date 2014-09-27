/*global require, module */
// # Search
// Module for search.
var $ = require('jquery'),
    _ = require('underscore'),
    util  = require('./util'),
    api = require('./api'),
    prop  = util.getProperty,
    SearchResults = require('./searchResult'),
    ArtistInfo = require('./artistInfo'),
    Classic = require('./classic'),
    Aura = require('./aura');

// ## Search()
function Search(data) {
  this._data = Object.freeze({
    results: new SearchResults(data)
  });
}

// ### Instance methods
Search.prototype = {};

Search.api = function () {
  return api;
};

// ### Search.find()
//
// Method to search by artist name.
//
// + **param** q *String* to do search against artist names with. 
// + **param** cb Callback. Is passed a SearchResults
// 
// **returns** *SearchResults*
Search.find = function (q, cb) {
  return api.searchRequest('artists', {q: q}, function(status, data) {
    cb(new SearchResults(data, q));
  });    
};

// ### Search.exactInfo()
//
// Method to find AristInfo object from an exact string match on
// artist name.
//
// + **param** q *String* to do search against artist names with. 
// + **param** cb Callback. Is passed an AristInfo for the artist
// 
// **returns** *ArtistInfo*
Search.exactInfo = function (q, cb) {
  return api.searchRequest('artists', {q: q}, function(status, data) {
    var res = new SearchResults(data, q);
    ArtistInfo.fetchByOaArtistId(res.exactMatch().oaArtistId(), cb);
  });
};

// ### Search.exactClassic()
//
// Method to find Classic object from an exact string match on
// artist name.
//
// + **param** q *String* to do search against artist names with. 
// + **param** cb Callback. Is passed an AristInfo for the artist
// 
// **returns** *Classic*
Search.exactClassic = function (q, cb) {
  return api.searchRequest('artists', {q: q}, function(status, data) {
    var res = new SearchResults(data, q);
    Classic.fetchByOaArtistId(res.exactMatch().oaArtistId(), cb);
  });
};


// ### Search.matchAlias()
//
// Method to find AristInfo object using regex match against the
// alias/name qualifier as refinement criteria.
//
// + **param** q *String* to do search against artist names with. 
// + **param** qual *String* to match against name qualifier in regex. 
// + **param** cb Callback. Is passed an AristInfo for the artist
// 
// **returns** *ArtistInfo*
Search.matchAlias = function (q, qual, cb) {
  return api.searchRequest('artists', {q: q}, function(status, data) {
    var res = new SearchResults(data, q);
    ArtistInfo.fetchByOaArtistId(res.matchNameQualifier(qual).oaArtistId(), cb);
  });
};

// ### Search.exactParticles()
//
// Method to find Aura
//
// + **param** q *String* to do search against artist names with. 
// + **param** cb Callback. Is passed an AristInfo for the artist
// 
// **returns** *Aura*
Search.exactParticles = function (q, cb) {
  return api.searchRequest('artists', {q: q}, function(status, data) {
    var res = new SearchResults(data, q);
    Aura.fetchByOaArtistId(res.exactMatch().oaArtistId(), cb);
  });
};

module.exports = Search;

