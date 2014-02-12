/*global define, describe, it, beforeEach, expect, spyOn, require */
define(function (require) {
  describe("API", function () {
      var _ = require('underscore'),
          ArtistInfo = require("app/artistInfo"),
          Aura = require('app/aura'),
          oaArtistId = 47, // the ole standby
          musicbrainzGid = "20244d07-534f-4eff-b4d4-930878889970",
          config = require('./mocks/config'),
          aiMethods = [
            'oaArtistId', 'name', 'bio', 
            'coverPhoto', 'factCard', 
            'profilePhoto', 'styleTags'
          ],
          auraMethods = [
            'particleCount', 'anchor', 'nextParticles', 'particles'
          ];

    describe("Artist Info", function() {
      beforeEach(function () {
        ArtistInfo.api().setConfig(function () { return config; });
      });

      it("should be configurabale", function() {
        expect(ArtistInfo.api().config()).toEqual(config);
      });

      it("should create an ArtistInfo instance which responds to the apropriate methods", function (done) {
        ArtistInfo.fetchByOaArtistId(oaArtistId, function (ai) {
          _.each(aiMethods, function (name) {
            expect(_.has(ai, name));
            expect(typeof ai[name] == 'function');
          });
          done();
        });
      });

      it("Taylor Swift's name is Taylor Swift by oa:artist_id", function (done) {
        ArtistInfo.fetchByOaArtistId(oaArtistId, function (ai) {
          expect(ai.name()).toEqual("Taylor Swift");
          done();
        });
      });

      it("Taylor Swift's name is Taylor Swift by musicbrainz:gid", function (done) {
        ArtistInfo.fetchByMbGid(musicbrainzGid, function (ai) {
          expect(ai.name()).toEqual("Taylor Swift");
          done();
        });
      });
    });

    describe("Stream", function() {
      beforeEach(function () {
        Aura.api().setConfig(function () { return config; });
      });

      it("should be configurabale", function() {
        expect(Aura.api().config()).toEqual(config);
      });

      it("should create an Aura instance which responds to the apropriate methods", function (done) {
        Aura.fetchByOaArtistId(oaArtistId, function (ai) {
          _.each(auraMethods, function (name) {
            expect(_.has(ai, name));
            expect(typeof ai[name] == 'function');
          });
          done();
        });
      });
    });
  });
});










