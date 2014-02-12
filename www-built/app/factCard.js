define([ "require", "./util" ], function(require) {
    var util = require("./util"), prop = util.getProperty;
    function FactCard(data) {
        this._data = Object.freeze({
            birthname: prop(data, "birthname"),
            birthdate: prop(data, "birthdate"),
            birthplace: prop(data, "birthplace"),
            locationFormed: prop(data, "location_formed"),
            members: prop(data, "members"),
            labels: prop(data, "labels"),
            associatedActs: prop(data, "associated_acts"),
            website: prop(data, "website")
        });
    }
    return FactCard.prototype = {
        birthdate: function() {
            return this._data.birthdate;
        },
        birthname: function() {
            return this._data.birthname;
        },
        birthplace: function() {
            return this._data.birthplace;
        },
        locationFormed: function() {
            return this._data.locationFormed;
        },
        members: function() {
            
return this._data.members;
        },
        labels: function() {
            return this._data.labels;
        },
        associatedActs: function() {
            return this._data.associatedActs;
        },
        website: function() {
            return this._data.website;
        }
    }, FactCard;
});;