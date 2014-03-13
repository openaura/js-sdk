/**
 * We require OA to have been set up at this point so we can call config()
 * to get API keys.
 */

/*global OA, define */
define(function (require) {
  var $    = require('jquery'),
      _    = require('underscore'),
      util = require('./util'),
      prop = util.getProperty,
      root = this,
      
      OA_API = function(api) {
        var cfg = function () {
          var fn = prop(root, "OA.config") || require('./initialize')();
          return fn();
        };

        function prep(endpoint, params, callback, errback, method) {
          return {
            timeout:  50000,
            type:     typeof(method) == 'undefined' ? 'GET' : method,
            data:     params,
            success:  function(data, textStatus, jqXHR) {
              callback(textStatus, data);
            },
            error:  function(jqXHR, textStatus, errorThrown) {
              callback(textStatus, false);
            }
          };
        }

        function key(type) {
          return type == 'stream' ? cfg().stream_key : cfg().info_key;
        }

        api.setConfig = function (conf) {
          cfg = conf;
        };

        api.config = function () {
          return _.clone(cfg());
        };

        api.artistSearch = function(endpoint, params, callback, method) {
          var api_call = prep(endpoint, params, callback, method),
              config = cfg();

          api_call.data.limit = config.max_particles;
          api_call.data.api_key = key('info');
          api_call.url = config.base_api_url + '/search/' + endpoint + '?callback=?';

          return $.ajax(api_call); // returns a jQuery.Deferred          
        };

        api.streamRequest = function(endpoint, params, callback, method) {
          var api_call = prep(endpoint, params, callback, method),
              config = cfg();

          api_call.data.limit = config.max_particles;
          api_call.data.api_key = key('info');
          api_call.url = config.base_api_url + '/particles/' + endpoint + '?callback=?';

          return $.ajax(api_call); // returns a jQuery.Deferred
        };

        api.infoRequest = function(endpoint, params, callback, method) {
          var api_call = prep(endpoint, params, callback, method);
          api_call.data.api_key = key('info');
          api_call.url = cfg().base_api_url + '/info/' + endpoint; // + '?callback=' + callback_url;
          
          return $.ajax(api_call); // returns a jQuery.Deferred
        };

        api.sourceRequest = function(endpoint, params, callback, method) {
          var api_call = prep(endpoint, params, callback, method);
          api_call.data.api_key = key('info');
          api_call.url = cfg().base_api_url + '/source/' + endpoint; // + '?callback=' + callback_url;
          
          return $.ajax(api_call); // returns a jQuery.Deferred
        };

        api.searchRequest = function(endpoint, params, callback, method) {
          var api_call = prep(endpoint, params, callback, method);
          api_call.data.api_key = key('info');
          api_call.url = cfg().base_api_url + '/search/' + endpoint; // + '?callback=' + callback_url;
          
          return $.ajax(api_call); // returns a jQuery.Deferred
        };

        return api;
      }(OA_API || {});

  return OA_API;
});
