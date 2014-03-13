/*global define, describe, it, beforeEach, expect, spyOn, require */
define(function (require) {
  var _ = require('underscore'),
      util = require('app/util'),
      prop = util.getProperty,      
      ArtistInfo = require("app/artistInfo"),
      infoResponse = require("./mocks/artistInfo"),
      ai;

  beforeEach(function () {
    ai = new ArtistInfo(infoResponse);
  });

  describe("Artist Info", function() {
    it("should instantiate with valid data", function () {
      expect(ai);
    });

    it("should return have the correct oaAnchorIdid", function () {
      expect(ai.oaAnchorId()).toEqual(prop(infoResponse, "oa_anchor_id"));
    });

    it("should return Taylor Swift as the name", function () {
      expect(ai.name()).toEqual("Taylor Swift");
    });

    it("should return have oaArtistId 47", function () {
      expect(ai.oaArtistId()).toEqual(47);
    });

    it("should return have the correct musicbrainzGid", function () {
      expect(ai.musicbrainzGid()).toEqual(prop(infoResponse, "musicbrainz_gid"));
    });

    it("should return have the correct requestId", function () {
      expect(ai.requestId()).toEqual(prop(infoResponse, "request_id"));
    });

    it("should return the correct bio as a string", function () {
      var bio = ai.bio();
      expect(bio).toEqual(prop(infoResponse, "bio.media.0.data.text"));
    });

    it("should return the correct bio as a string", function () {
      var bio = ai.bio();
      expect(bio).toEqual(prop(infoResponse, "bio.media.0.data.text"));
    });

    it("should return the correct fact card as an object", function () {
      var fc = ai.factCard();
      expect(fc).toEqual(prop(infoResponse, "fact_card.media.0.data"));
    });

    it("should return the correct style tags as an array", function () {
      var tags = ai.styleTags();
      expect(tags).toEqual(prop(infoResponse, "style_tags.media.0.data.tags"));
    });  

    it("should return the correct profile images as a MediaCollection", function () {
      var mc = ai.profilePhoto();
      expect(mc.length()).toEqual(prop(infoResponse, "profile_photo.media").length);
    });

    it("should not lose any values in serialization round trip", function () {
      var ai2 = new ArtistInfo(ai.asObject());

      expect(ai2.oaAnchorId()).toEqual(prop(infoResponse, "oa_anchor_id"));
      expect(ai2.musicbrainzGid()).toEqual(prop(infoResponse, "musicbrainz_gid"));
      expect(ai2.requestId()).toEqual(prop(infoResponse, "request_id"));
      expect(ai2.name()).toEqual("Taylor Swift");
      expect(ai2.oaArtistId()).toEqual(47);
      expect(ai2.bio()).toEqual(prop(infoResponse, "bio.media.0.data.text"));
      expect(ai2.factCard()).toEqual(prop(infoResponse, "fact_card.media.0.data"));
      expect(ai2.styleTags()).toEqual(prop(infoResponse, "style_tags.media.0.data.tags"));
      expect(ai2.profilePhoto().length()).toEqual(prop(infoResponse, "profile_photo.media").length);
    });
  });
});













