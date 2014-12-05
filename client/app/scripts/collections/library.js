define([
    'underscore',
    'backbone',
    'models/book',
    'urls'
], function (_, Backbone, BookModel, apiUrls) {
    'use strict';

    var LibraryCollection = Backbone.Collection.extend({

        url: apiUrls.getUrl("library"),

        model: BookModel,

        fetch: function(options) {
            this.trigger("fetch", this, options);

            return Backbone.Collection.prototype.fetch.call(this, options);
        },

        parse: function(response, xhr) {
            debugger;
            return response;
        }
    });

    return LibraryCollection;
});
