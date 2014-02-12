{
  "appDir": "../www",
  "baseUrl": "lib",
  "paths": {
    "app": "../app"
  },
  "dir": "../www-built",

  "uglify": {
    "toplevel": true,
    "ascii_only": true,
    "beautify": true,
    "max_line_length": 1000,

    //How to pass uglifyjs defined symbols for AST symbol replacement,
    //see "defines" options for ast_mangle in the uglifys docs.
    "defines": {
      DEBUG: ['name', 'false']
    },

    //Custom value supported by r.js but done differently
    //in uglifyjs directly:
    //Skip the processor.ast_mangle() part of the uglify call (r.js 2.0.5+)
    "no_mangle": true
  },
  "modules": [
    {
      // include the whole shebang (libs and all)
      "name": "app/all",
       "override": {
         "wrap": {
           "startFile": "parts/start.frag",
           "endFile": "parts/end.frag"
         },
       },
      "insertRequire": ['app/all']
    },
    {
      // exclude the require wrapper.
      "name": "app/no-wrap"
    }
  ]
}
