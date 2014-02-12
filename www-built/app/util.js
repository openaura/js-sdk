define([ "require" ], function(require) {
    function getProp(obj, propName) {
        var propAr = propName.split("."), head = propAr.shift(), tailStr = propAr.join(".");
        return typeof obj != "undefined" && obj != null && obj.hasOwnProperty(head) && typeof obj[head] != "undefined" && obj[head] != null ? propAr.length ? getProp(obj[head], tailStr) : obj[head] : null;
    }
    return {
        getProperty: getProp
    };
});;