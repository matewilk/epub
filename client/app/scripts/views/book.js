define(function(require){
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        template = require('templates'),
        LibraryCollection = require('collections/library'),
        BookModel = require('models/book');

    var BookView = Backbone.View.extend({

        template: JST['app/scripts/templates/book.hbs'],

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });

    return BookView;
});
