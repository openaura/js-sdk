/*global define */
  define(function (require) {
  var root = this;

    return function (config) {
      var OA = OA || root.OA || {},
          baseCfg = {
            "base_api_url": "http://api.openaura.com/v1",
            "stream_key": "YOUR_STREAM_KEY",
            "info_key": "YOUR_INFO_KEY",
            "callback_url": "YOUR_CALLBACK_URL",
            "max_particles": 100
          };
      
      for (var key in baseCfg) {
        config[key] = config[key] || baseCfg[key];
      };
      
      return OA.config = function () { return config; };
    };
  });
