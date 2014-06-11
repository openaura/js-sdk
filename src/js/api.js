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
    restler = require('restler'),
    Q = require('q'),
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
      function prep(endpoint, params, callback, method) {
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

      function respserver(url, params, cb, method) {
        var deferred = Q.defer(),
            options = {
              method: typeof(method) == 'undefined' ? 'GET' : method,
              query: params
            };

        restler.get(url, options)
               .on('success', function(data, response) {
                 deferred.resolve(cb('success', data));
               })
               .on('fail', function(data, response) {
                  deferred.reject(cb('error', false));
               })
               .on('error', function(data, response) {
                  deferred.reject(cb('error', false));
               });

        return deferred.promise;
      }

      function key(type) {
        return init.config()['api_key'];
      }

      api.setConfig = function (conf) {
        init(conf);
      };

      api.config = function () {
        return init.config();
      };

      api.artistSearch = function(endpoint, params, callback, method) {
        var config = init.config(),
            url = config.base_api_url + '/search/' + endpoint,
            window_api_call;

        params.limit = config.max_particles;
        params.api_key = key('info');

        // return a jQuery.Deferred via jQuery ajax in browser or http request on server
        if (window) {
          window_api_call = prep(endpoint, params, callback, method);
          window_api_call.url = url;
          return $.ajax(window_api_call); 
        } else {
          return respsever(url, params, callback, method);
        }
      };

      api.streamRequest = function(endpoint, params, callback, method) {
        var config = init.config(),
            url = config.base_api_url + '/particles/' + endpoint,
            window_api_call;

        params.limit = config.max_particles;
        params.api_key = key('info');

        // return a jQuery.Deferred via jQuery ajax in browser or http request on server
        if (typeof(window) != 'undefined' && window) {
          window_api_call = prep(endpoint, params, callback, method);
          window_api_call.url = url;
          return $.ajax(window_api_call); 
        } else {
          return respserver(url, params, callback, method);
        }
      };

      api.infoRequest = function(endpoint, params, callback, method) {
        var config = init.config(),
            url = config.base_api_url + '/info/' + endpoint,
            window_api_call;

        params.limit = config.max_particles;
        params.api_key = key('info');

        // return a jQuery.Deferred via jQuery ajax in browser or http request on server
        if (typeof(window) != 'undefined' && window) {
          window_api_call = prep(endpoint, params, callback, method);
          window_api_call.url = url;
          return $.ajax(window_api_call); 
        } else {
          return respserver(url, params, callback, method);
        }
      };

      api.sourceRequest = function(endpoint, params, callback, method) {
        var config = init.config(),
            url = config.base_api_url + '/source/' + endpoint,
            window_api_call;

        params.limit = config.max_particles;
        params.api_key = key('info');

        // return a jQuery.Deferred via jQuery ajax in browser or http request on server
        if (typeof(window) != 'undefined' && window) {
          window_api_call = prep(endpoint, params, callback, method);
          window_api_call.url = url;
          return $.ajax(window_api_call); 
        } else {
          return respserver(url, params, callback, method);
        }
      };

      api.searchRequest = function(endpoint, params, callback, method) {
        var config = init.config(),
            url = config.base_api_url + '/search/' + endpoint,
            window_api_call;

        params.limit = config.max_particles;
        params.api_key = key('info');

        // return a jQuery.Deferred via jQuery ajax in browser or http request on server
        if (typeof(window) != 'undefined' && window) {
          window_api_call = prep(endpoint, params, callback, method);
          window_api_call.url = url;
          return $.ajax(window_api_call); 
        } else {
          return respserver(url, params, callback, method);
        }
      };

      return api;
    }(API || {});

module.exports = API;

