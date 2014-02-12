/*global define, exports, module */
define(function (require) {
  // Load any app-specific modules
  // with a relative require call,
  // like:
  var initialize = require('./initialize'),
      ArtistInfo = require('./artistInfo'),
      Aura = require('./aura'),
      root = this;

  var OA = OA || {};

  OA.initialize = initialize;
  OA.ArtistInfo = ArtistInfo;
  OA.Aura       = Aura;

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = OA;
    }
    exports.OA = OA;
  } else {
    root.OA = OA;
  }

  return OA;
});
