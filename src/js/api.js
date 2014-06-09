/**
 * We require OA to have been set up at this point so we can call config()
 * to get API keys.
 */
/*global require, module */

// Set up jQuery for node or DOM

var _    = require('underscore'),
    util = require('./util'),
    prop = util.getProperty,
    init = require('./initialize'),
    // $ = (function () {
    //   var w;
    //   if (typeof window == 'undefined') {
    //     w = require('jsdom').jsdom("<html><head></head><body></body></html>").createWindow();
    //   } else {
    //     w = window;
    //   }
    //   require('jquery')(w);
    // })(),
    $   = require('jquery'),

    API = function(api) {
      function prep(endpoint, params, callback, errback, method) {
        return {
          timeout:  50000,
          crossDomain: true,
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
        return init.config['api_key'];
      }

      api.setConfig = function (conf) {
        init(conf);
      };

      api.config = function () {
        return init.config();
      };

      api.artistSearch = function(endpoint, params, callback, method) {
        var api_call = prep(endpoint, params, callback, method),
            config = init.config();

        api_call.data.limit = config.max_particles;
        api_call.data.api_key = key('info');
        api_call.url = config.base_api_url + '/search/' + endpoint; // + '?callback=?';

        return $.ajax(api_call); // returns a jQuery.Deferred          
      };

      api.streamRequest = function(endpoint, params, callback, method) {
        var api_call = prep(endpoint, params, callback, method),
            config = init.config();

        api_call.data.limit = config.max_particles;
        api_call.data.api_key = key('info');
        api_call.url = config.base_api_url + '/particles/' + endpoint; // + '?callback=?';

        return $.ajax(api_call); // returns a jQuery.Deferred
      };

      api.infoRequest = function(endpoint, params, callback, method) {
        var api_call = prep(endpoint, params, callback, method);
        api_call.data.api_key = key('info');
        api_call.url = init.config().base_api_url + '/info/' + endpoint; // + '?callback=' + callback_url;
        
        return $.ajax(api_call); // returns a jQuery.Deferred
      };

      api.sourceRequest = function(endpoint, params, callback, method) {
        var api_call = prep(endpoint, params, callback, method);
        api_call.data.api_key = key('info');
        api_call.url = init.config().base_api_url + '/source/' + endpoint; // + '?callback=' + callback_url;
        
        return $.ajax(api_call); // returns a jQuery.Deferred
      };

      api.searchRequest = function(endpoint, params, callback, method) {
        var api_call = prep(endpoint, params, callback, method);
        api_call.data.api_key = key('info');
        api_call.url = init.config().base_api_url + '/search/' + endpoint; // + '?callback=' + callback_url;
        
        return $.ajax(api_call); // returns a jQuery.Deferred
      };

      return api;
    }(API || {});

module.exports = API;

