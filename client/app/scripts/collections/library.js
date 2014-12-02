define([
    'underscore',
    'backbone',
    'models/book'
], function (_, Backbone, BookModel) {
    'use strict';

    var LibraryCollection = Backbone.Collection.extend({

        url: "http://localhost:3000/library",

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
