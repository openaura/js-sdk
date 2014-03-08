/*global define, describe, it, beforeEach, expect, spyOn, require */
define(function (require) {
  describe("Particle", function() {
    var util  = require('app/util'),
        prop  = util.getProperty,
        Particle = require('app/particle'),
        particleObject = require("./mocks/particle"),
        p;

    beforeEach(function () {
      p = new Particle(particleObject);
    });

    it("should pass a sanity check", function() {
      expect(true).toBe(true);
    });

    it("should have valid values in the accessors", function() {
      expect(p.id()).toEqual(prop(particleObject, "oa_particle_id"));
      expect(p.text()).toEqual(prop(particleObject, "text"));
      expect(p.tags()).toEqual(prop(particleObject, "tags"));
      expect(p.provider()).toEqual(prop(particleObject, "source.provider"));
      expect(p.source()).toEqual(prop(particleObject, "source"));
      expect(p.oaArtistId()).toEqual(prop(particleObject, "oa_artist_id"));
      expect(p.profane()).toEqual(prop(particleObject, "profane"));
      expect(p.date()).toEqual(prop(particleObject, "date"));
    });

    it("should not lose any values in serialization round trip", function () {
      var p2 = new Particle(p.asObject());
      expect(p2.id()).toEqual(prop(particleObject, "oa_particle_id"));
      expect(p2.text()).toEqual(prop(particleObject, "text"));
      expect(p2.tags()).toEqual(prop(particleObject, "tags"));
      expect(p2.provider()).toEqual(prop(particleObject, "source.provider"));
      expect(p2.source()).toEqual(prop(particleObject, "source"));
      expect(p2.oaArtistId()).toEqual(prop(particleObject, "oa_artist_id"));
      expect(p2.profane()).toEqual(prop(particleObject, "profane"));
      expect(p2.date()).toEqual(prop(particleObject, "date"));
    });

  });
});
