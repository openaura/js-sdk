/*global define, describe, it, beforeEach, expect, spyOn, require */
define(function (require) {
  describe("Source", function() {
    var Source = require('app/source'),
        config = require('./mocks/config');

    it("should be configurabale", function() {
      Source.api().setConfig(function () { return config; });
      expect(Source.api().config()).toEqual(config);
    });
  });
});
