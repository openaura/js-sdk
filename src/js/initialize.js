/*global require, module */
var _ = require('underscore'),
    baseCfg = {
      "base_api_url": "http://api.openaura.com/v1",
      "api_key": "YOUR_API_KEY",
      "callback_url": "YOUR_CALLBACK_URL",
      "max_particles": 100
    };

var Initialize = function (config) {
  for (var key in baseCfg) {
    config[key] = config[key] || baseCfg[key];
  };

  Initialize.config = function () { return _.clone(config); };
};

Initialize.config = function () { return _.clone(baseCfg); };

module.exports = Initialize;
