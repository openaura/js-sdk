/*global define, describe, it, beforeEach, expect, spyOn, require */
define(function (require) {
  describe("Media", function() {
    var Media = require('app/media'),
        mediaObject = require("./mocks/media"),
        image;

    beforeEach(function () {
      image = new Media(mediaObject.image);
    });

    it("should pass a sanity check", function() {
      expect(true).toBe(true);
    });

    it("should have valid values in the accessors", function() {
      var i = mediaObject.image;

      expect(image.id()).toEqual(i.oa_media_id);
      expect(image.mediaType()).toEqual(i.type);
      expect(image.url()).toEqual(i.url);
      expect(image.width()).toEqual(i.width);
      expect(image.height()).toEqual(i.height);
      expect(image.mime()).toEqual(i.mime);
    });

    it("should not lose any values in serialization round trip", function () {
      var i = mediaObject.image,
          i2 = new Media(image.asObject());

      expect(image.id()).toEqual(i.oa_media_id);
      expect(image.mediaType()).toEqual(i.type);
      expect(image.url()).toEqual(i.url);
      expect(image.width()).toEqual(i.width);
      expect(image.height()).toEqual(i.height);
      expect(image.mime()).toEqual(i.mime);     
    });

  });
});










