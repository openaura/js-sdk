/*global define, describe, it, beforeEach, expect, spyOn, require */
define(function (require) {
  describe("Aura", function() {
    var Aura = require('app/aura'),
        config = require('./mocks/config');

    it("should be configurabale", function() {
      Aura.api().setConfig(function () { return config; });
      expect(Aura.api().config()).toEqual(config);
    });
  });
});
