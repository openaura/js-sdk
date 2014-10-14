/*global require, module */
// # SearchResult
// Module for search.
var $ = require('jquery'),
    _ = require('underscore'),
    util  = require('./util'),
    prop  = util.getProperty,
    ArtistInfo = require('./artistInfo'),
    Classic = require('./classic'),
    Aura = require('./aura');

function Result(data) {
  this._data = Object.freeze({
    oaArtistId: prop(data, 'oa_artist_id'),
    name: prop(data, 'name'),
    nameQualifier: prop(data, 'name_qualifier'),
    musicbrainzGid: prop(data, 'musicbrainz_gid')
  });
}

Result.prototype = {
  artistInfo: function (cb) {
    ArtistInfo.fetchByOaArtistId(this._data.oaArtistId, cb);
  },

  particles: function (cb) {
    Aura.fetchByOaArtistId(this._data.oaArtistId, cb);
  },

  classic: function (cb) {
    Classic.fetchByOaArtistId(this._data.oaArtistId, cb);
  },

  oaArtistId: function () { return this._data.oaArtistId; },
  name: function () { return this._data.name; },
  nameQualifier: function () { return this._data.nameQualifer; },
  musicbrainzGid: function () { return this._data.musicbrainzGid; },

  asObject: function () {
    return {
      oa_artist_id: this.oaArtistId(),
      name: this.name(),
      name_qualifier: this.nameQualifier(),
      musicbrainz_gid: this.musicbrainzGid()
    };
  }
};

// ## SearchResults()
function SearchResults(data, reqString) {
  this._data = Object.freeze({
    reqString: reqString,
    results: _.map(data, function (r) {
      return new Result(r);
    })
  });
}

// ### Instance methods
SearchResults.prototype = {
  // #### reqString()
  // Accessor for requst string.
  //
  // **returns** *String* the string used in the initial search query.
  reqString: function () { return this._data.reqString; },

  // #### results()
  // Accessor for the search results set.
  //
  // **returns** *Array[Result]* an array containing the search results.
  results: function () { return this._data.results; },

  // #### each()
  //
  // Iterate through the Results and call fn on each Result.
  //
  // + **param** fn A callback which operates on a Media object.
  each: function(fn) {
    _.each(this._data, fn);
  },

  // #### filter()
  //
  // Filter the SearchResults using a function that takes a Result
  // object and returns a boolean. This will create a new
  // SearchResult containing only Result objects for which this
  // function returned a truthy value.
  //
  // + **param** fn function that takes a Media object and returns a boolean.
  //
  // **returns** *SearchResults* new SearchResults containing all
  // Result objects for which fn returned true.
  filter: function(fn) {
    return new SearchResults(
      _.chain(this._data.results)
        .filter(fn)
        .map(function (r) { return r.asObject(); })
        .value()
    );
  },

  // #### map()
  //
  // Iterate through all Result objects in SearchReults and
  // return an array containing the results of calling fn on each.
  //
  // + **param** fn function that operates on a Media Object.
  //
  // **returns** *Array* array containing the results of performing fn
  // on each Result.
  map: function(fn) {
    return _.map(this._data, fn);
  },

  // #### exactMatch()
  //
  // Find one result where the name is an exact match for the query.
  //
  // **returns** *Result* The first Result with an exact match for
  // the name.
  exactMatch: function () {
    var that = this;
    return _.find(this.results(), function (r) {
      return r.name() == that.reqString();
    });
  },

  // #### match()
  //
  // Find the first result where the name is match for the query.
  //
  // **returns** *Result* The first Result with an exact match for
  // the name.
  match: function () {
    var that = this,
        re = new RegExp(that.reqString(), "i");
    return _.find(this.results(), function (r) {
      return re.test(r.name());
    });
  },


  // #### matchNameQualifier()
  //
  // Find one result where the name qualifer passes a regex match
  // against the supplied string.
  //
  // + **param** q a query string to match against.
  //
  // **returns** *Result* The first Result which returns true on a
  // regex test() against the name qualifier.
  matchNameQualifier: function (q) {
    return _.find(this.results(), function (r) {
      return /q/.test(r.nameQualifier());
    });
  },

  // #### asObject()
  //
  // **returns** *Object* a plain JS Object with a copy of the data
  // contained in this SearchResult object.
  asObject: function () {
    return {
      req_string: this.reqString(),
      results: _.map(this.results(), function (r) { return r.asObject(); })
    };
  }
};

module.exports = SearchResults;
