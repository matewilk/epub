define(function(require){
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        template = require('templates'),
        LibraryCollection = require('collections/library'),
        BookModel = require('models/book');

    var LibraryView = Backbone.View.extend({
        template: JST['app/scripts/templates/library.hbs'],

        initialize: function() {
            this.libraryCollection = new LibraryCollection;
            this.libraryCollection.on("fetch", this.onFetch, this);

            this.libraryCollection.on("reset", function(){console.log('reset')});//do I really need it ?

            this.libraryCollection.fetch({
                success: this.onSuccess.bind(this),
                reset: true
            });
        },

        onFetch: function() {
            debugger;
        },

        onSuccess: function() {
            //render template but it's already rendered in router - render second time ?
        },

        render: function () {
            this.$el.html(this.template());

            return this;
        }
    });

    return LibraryView;
});