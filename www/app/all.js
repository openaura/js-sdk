/*global define, exports, module */
define(function (require) {
  // Load any app-specific modules
  // with a relative require call,
  // like:
  var initialize = require('./initialize'),
      ArtistInfo = require('./artistInfo'),
      Aura = require('./aura'),
      Source = require('./source'),
      Search = require('./search'),
      root = this;

  var OA = OA || {};

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = OA;
    }
    exports.OA = OA;
  } else {
    root.OA = OA;
    if (! "require" in root) {
      root.require = require;
    }
  }

  OA.initialize = initialize;
  OA.ArtistInfo = ArtistInfo;
  OA.Aura       = Aura;
  OA.Source     = Source;
  OA.Search      = Search;

  return OA;
});
