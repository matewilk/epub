define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        JST = require('templates');

    return Backbone.View.extend({

        template: JST['app/scripts/templates/menu.hbs'],

        events: {
            'click a': 'itemClick'
        },

        render: function () {
            this.$el.html(this.template());

            return this;
        },

        itemClick: function(e) {
            e.preventDefault();
            Backbone.trigger('router:go', this.$(e.target).attr('data-value'));
        }
    });
});
