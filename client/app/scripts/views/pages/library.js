define(function(require){
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        JST = require('templates'),
        LibraryCollection = require('collections/library'),
        BookView = require('views/components/book');

    var LibraryView = Backbone.View.extend({

        className: 'container',

        template: JST['app/scripts/templates/library.hbs'],

        initialize: function() {
            this.collection = new LibraryCollection();

            this.collection.fetch({
                success: this.onSuccess.bind(this),
                reset: true
            });
        },

        onSuccess: function() {
            //render template but it's already rendered in router - render second time ?
            this.render();
        },

        render: function () {
            this.$el.html(this.template({
                count: this.collection.length
            }));

            this.collection.each(function(item) {
                this.renderBook(item);
            }, this);

            return this;
        },

        renderBook: function(book) {
            var bookView = new BookView({
                model: book
            });
            this.$('.row').append(bookView.render().el);
        }
    });

    return LibraryView;
});
