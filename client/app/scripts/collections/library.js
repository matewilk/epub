define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        BookModel = require('models/book'),
        apiUrls = require('scripts/urls');

    var LibraryCollection = Backbone.Collection.extend({

        url: apiUrls.getUrl("library"),

        model: BookModel,

        fetch: function(options) {
            this.trigger("fetch", this, options);

            return Backbone.Collection.prototype.fetch.call(this, options);
        },

        parse: function(response/*, xhr*/) {
            //debugger;
            return response;
        }
    });

    return LibraryCollection;
});
