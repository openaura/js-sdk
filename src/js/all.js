/*global require, module */
// Load any app-specific modules
// with a relative require call,
// like:
var initialize = require('./initialize'),
    ArtistInfo = require('./artistInfo'),
    Aura = require('./aura'),
    Source = require('./source'),
    Search = require('./search'),
    OA = {
      initialize: initialize,
      ArtistInfo: ArtistInfo,
      Aura: Aura,
      Source: Source,
      Search: Search
    };

if (typeof window != 'undefined') {
  window.OA = OA;
}

module.exports = OA;
 
