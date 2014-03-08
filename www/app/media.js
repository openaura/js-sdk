/*global define */
// # Media()
// Module representing Media returned with a Particle. Media can
// represent text, JSON data, or, most commonly, a URI for an image or
// other consumable media.
define(function (require) {
  var util = require('./util'),
      prop = util.getProperty;
  
  // ## Media()
  //
  // Constructor. This takes the raw API response. Users of the SDK
  // should use a factory method rather than calling this directly.
  function Media(data) {
    this._data = Object.freeze({
      id: prop(data, "id"),
      mediaType: prop(data, "type"),
      url: prop(data, "url"),
      width: prop(data, "width"),
      height: prop(data, "height"),
      mime: prop(data, "mime"),
      data: prop(data, "data")
    });
  }

  // ### Instance methods
  Media.prototype = {
    // #### id()
    // Accessor for media id.
    //
    // **returns** *Strings* a 12-byte hexidecimal id.
    id: function () { return this._data.id; },
    // #### mediaType()
    // Accessor for media type.
    //
    // **returns** *String* image, video, embed, audio, json, text
    mediaType: function () { return this._data.mediaType; },
    // #### url()
    // Accessor for media URL.
    //
    // **returns** *String* URI for media.
    url: function () { return this._data.url; },
    // #### width()
    // Accessor for width.
    // **returns** *Number* width of media in pixels.
    width: function () { return this._data.width; },
    // #### height()
    // Accessor for height.
    //
    // **returns** *Number* height of media in pixels.
    height: function () { return this._data.height; },
    // #### mimeType()
    // Accessor for mime type.
    //
    // **returns** *String* mime type of associated media.
    mime: function () { return this._data.mime; },
    // #### data()
    // Accessor for JSON data.
    //
    // **returns** *Object* a JSON object with data represented as key
    // value pairs.
    data: function () { return this._data.data; },

    // #### asObject()
    //
    // **returns** *Object* a plain JS Object with a copy of the data
    // contained in this Media object.
    asObject: function () {
      return {
        id: this.id(),
        type: this.mediaType(),
        url: this.url(),
        width: this.width(),
        height: this.height(),
        mime: this.mime(),
        data: this.data()
      };
    }
  };
  
  return Media;
});
