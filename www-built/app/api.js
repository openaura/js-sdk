define([ "require", "jquery", "underscore", "./util", "./initialize" ], function(require) {
    var $ = require("jquery"), _ = require("underscore"), util = require("./util"), prop = util.getProperty, root = this, OA_API = function(api) {
        var cfg = prop(root, "OA.config") || require("./initialize")();
        function prep(endpoint, params, callback, errback, method) {
            return {
                timeout: 5e4,
                type: typeof method == "undefined" ? "GET" : method,
                data: params,
                success: function(data, textStatus, jqXHR) {
                    callback(textStatus, data);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    callback(textStatus, !1);
                }
            };
        }
        function key(type) {
            return type == "stream" ? cfg().stream_key : cfg().info_key;
        }
        return api.setConfig = function(conf) {
            cfg = conf;
        
}, api.config = function() {
            return _.clone(cfg());
        }, api.streamRequest = function(endpoint, params, callback, method) {
            var api_call = prep(endpoint, params, callback, method), config = cfg();
            return api_call.data.limit = config.max_particles, api_call.data.api_key = key("stream"), api_call.url = config.base_api_url + "/stream/" + endpoint + "?callback=?", $.ajax(api_call);
        }, api.infoRequest = function(endpoint, params, callback, method) {
            var api_call = prep(endpoint, params, callback, method);
            return api_call.data.api_key = key("info"), api_call.url = cfg().base_api_url + "/info/" + endpoint, $.ajax(api_call);
        }, api.sourceRequest = function(endpoint, params, callback, method) {
            var api_call = prep(endpoint, params, callback, method);
            return api_call.data.api_key = key("info"), api_call.url = cfg().base_api_url + "/source/" + endpoint, $.ajax(api_call);
        }, api.searchRequest = 
function(endpoint, params, callback, method) {
            var api_call = prep(endpoint, params, callback, method);
            return api_call.data.api_key = key("info"), api_call.url = cfg().base_api_url + "/search/" + endpoint, $.ajax(api_call);
        }, api;
    }(OA_API || {});
    return OA_API;
});;