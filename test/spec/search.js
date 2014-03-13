/*global define, describe, it, beforeEach, expect, spyOn, require */
define(function (require) {
  describe("Search", function () {
    var Search = require('app/search'),
        config = require('./mocks/config');

    it("should be configurable", function () {
      Search.api().setConfig(function () { return config; });
      expect(Search.api().config()).toEqual(config);    
    });

    it("should be able to get an search result for 'taylor swift'", function (done) {
      Search.api().setConfig(function () { return config; });

      Search.find("taylor swift", function (res) {
        expect(res.results().length).toBeGreaterThan(0);
        done();
      });
    });

    it("should be able to get one exact info result for 'taylor swift'", function (done) {
      Search.api().setConfig(function () { return config; });

      Search.exactInfo("Taylor Swift", function (res) {
        expect(res.name()).toEqual("Taylor Swift");
        done();
      });
    });

    it("should be able to get one particle set result for 'taylor swift'", function (done) {
      Search.api().setConfig(function () { return config; });

      Search.exactParticles("Taylor Swift", function (res) {
        expect(res.particles().first().oaArtistId()).toEqual(47);
        done();
      });
    });

    it("should be able to filter results with a function", function (done) {
      Search.api().setConfig(function () { return config; });

      Search.find("Taylor Swift", function (res) {
        var filtered = res.filter(function (r) {
          // exact match the long way
          return r.name() == "Taylor Swift";
        });
        done();
      });
    });
  });
});
