/*global define */
// # SearchResult
// Module for search.
define(function (require) {
  var $ = require('jquery'),
      _ = require('underscore'),
      util  = require('./util'),
      prop  = util.getProperty,
      ArtistInfo = require('./artistInfo'),
      Aura = require('./aura');
  
  function Result(data) {
    this._data = Object.freeze({
      oaArtistId: prop(data, 'oa_artist_id'),
      name: prop(data, 'name'),
      nameQualifier: prop(data, 'name_qualifier'),
      musicBrainzGid: prop(data, 'musicbrainz_gid')
    });
  }

  Result.prototype = {
    artistInfo: function (cb) {
      ArtistInfo.fetchByOaArtistId(this._data.oaArtistId, cb);
    },
    particles: function (cb) {
      Aura.fetchByOaArtistId(this._data.oaArtistId, cb);
    }
  };

  // ## SearchResults()
  function SearchResults(data, reqString) {
    this._data = Object.freeze({
      reqString: reqString,
      results: _.map(data, function (r) {
        new Result(r);
      })
    });
  }

  // ### Instance methods
  SearchResults.prototype = {
    exactMatch: function() {
      return _.find(this._data.results, function (r) {
        return r.name == this._data.reqString;
      });
    },

    matchNameQualifier: function (q) {
      return _.find(this._data.results, function (r) {
        return /q/.test(r.nameQualifier);
      });
    }
  };

  return SearchResults;
});
