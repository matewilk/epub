define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        JST = require('templates');

    var HomePage = Backbone.View.extend({
        template: JST['app/scripts/templates/main.hbs'],

        render: function () {
            this.$el.html(this.template());

            return this;
        }
    });

    return HomePage;
});