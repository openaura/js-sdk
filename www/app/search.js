/*global define */
// # Search
// Module for search.
define(function (require) {
  var $ = require('jquery'),
      _ = require('underscore'),
      util  = require('./util'),
      api = require('./api'),
      prop  = util.getProperty,
      SearchResults = require('./searchResult'),
      ArtistInfo = require('./artistInfo'),
      Aura = require('./aura');
  
  // ## Search()
  function Search(data) {
    this._data = Object.freeze({
      results: new SearchResults(data)
    });
  }

  // ### Instance methods
  Search.prototype = {};

  Search.find = function (q, cb) {
    return api.searchRequest('artists/' + q, function(status, data) {
      cb(new SearchResults(data, q));
    });    
  };

  Search.exactInfo = function (q, cb) {
    return api.searchRequest('artists/' + q, function(status, data) {
      var res = new SearchResults(data, q);
      ArtistInfo.fetchByOaArtistId(res.exactMatch().oaArtistId(), cb);
    });
  };

  Search.exactParticles = function (q, cb) {
    return api.streamRequest('artists/' + q, function(status, data) {
      var res = new SearchResults(data, q);
      Aura.fetchByOaArtistId(res.exactMatch().oaArtistId(), cb);
    });
  };

  return Search;
});

