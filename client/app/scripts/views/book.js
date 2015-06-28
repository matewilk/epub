define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        JST = require('templates');

    var BookView = Backbone.View.extend({

        template: JST['app/scripts/templates/book.hbs'],

        events: {
            'click a#open': 'openBook'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        openBook: function(e){
            e.preventDefault();

            var url = '/reader/'+this.model.get('name');
            Backbone.trigger('router:go', url);
        }
    });

    return BookView;
});
