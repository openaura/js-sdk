define([ "require", "./util" ], function(require) {
    var util = require("./util"), prop = util.getProperty;
    function Media(data) {
        this._data = Object.freeze({
            id: prop(data, "oa_media_id"),
            mediaType: prop(data, "mediaType"),
            url: prop(data, "url"),
            width: prop(data, "width"),
            height: prop(data, "height"),
            mime: prop(data, "mime"),
            data: prop(data, "data")
        });
    }
    return Media.prototype = {
        id: function() {
            return this._data.id;
        },
        mediaType: function() {
            return this._data.mediaType;
        },
        url: function() {
            return this._data.url;
        },
        width: function() {
            return this._data.width;
        },
        height: function() {
            return this._data.height;
        },
        mime: function() {
            return this._data.mime;
        },
        data: function() {
            
return this._data.data;
        },
        asObject: function() {
            return {
                id: this.id(),
                mediaType: this.mediaType(),
                url: this.url(),
                width: this.width(),
                height: this.height(),
                mime: this.mime(),
                data: this.data()
            };
        }
    }, Media;
});;