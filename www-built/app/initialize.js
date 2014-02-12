define([ "require" ], function(require) {
    return function(config) {
        var root = this, OA = root.OA || {}, cfg = function() {
            return Object.freeze({
                base_api_url: "http://api.openaura.com/v1",
                stream_key: config.stream_key || "YOUR_STREAM_KEY",
                info_key: config.info_key || "YOUR_INFO_KEY",
                callback_url: config.callback_url || "YOUR_CALLBACK_URL",
                max_particles: config.max_particles || 100
            });
        };
        return OA.config = cfg;
    };
});;