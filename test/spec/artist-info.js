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

    it("should return Taylor Swift as the name", function () {
      expect(ai.name()).toEqual("Taylor Swift");
    });

    it("should return have oaArtistId 47", function () {
      expect(ai.oaArtistId()).toEqual(47);
    });

    it("should return the correct bio as a string", function () {
      var bio = ai.bio();
      expect(bio).toEqual(prop(infoResponse, "bio.text"));
    });

    it("should return the correct fact card as an object", function () {
      var fc = ai.factCard();
      expect(fc).toEqual(prop(infoResponse, "fact_card.media.0.data"));
    });

    it("should return the correct style tags as an array", function () {
      var tags = ai.styleTags();
      expect(tags).toEqual(prop(infoResponse, "tags.media.0.data.tags"));
    });  

    it("should return the correct profile images as a MediaCollection", function () {
      var mc = ai.profilePhoto();
      expect(mc.length()).toEqual(prop(infoResponse, "profile_photo.media").length);
    });  
  });
});













