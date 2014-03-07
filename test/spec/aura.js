/*global define, describe, it, beforeEach, expect, spyOn, require */
define(function (require) {
  describe("Aura", function() {
    var Aura = require('app/aura'),
        config = require('./mocks/config');

    it("should be configurabale", function() {
      Aura.api().setConfig(function () { return config; });
      expect(Aura.api().config()).toEqual(config);
    });

    it("should be able to get an aura response for artist 47", function (done) {
      Aura.api().setConfig(function () { return config; });

      Aura.fetchByOaArtistId(47, function (a) {
        a.particles().withMediaWithin(0, 0, 1000, 3000).each(function(x) {
          expect(x.oaArtistId()).toEqual(47);
        });

        done();
      });
    });

    it("shouldn't blow up on particle iteration for artist 47", function (done) {
      Aura.api().setConfig(function () { return config; });

      Aura.fetchByOaArtistId(47, function (a) {
        a.particles().withMediaWithin(0, 0, 1000, 3000).each(function(x) {
          expect(x.id()).not.toBeNull();
        });

        done();
      });
    });
  });
});
