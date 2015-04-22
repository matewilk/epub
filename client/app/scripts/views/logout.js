define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        LogoutModel = require('models/logout'),
        JST = require('templates')

    return Backbone.View.extend({
        model: new LogoutModel(),

        template: JST['app/scripts/templates/logout.hbs'],

        events: {
            'submit form': 'logout'
        },

        initialize: function(){
            this.render();
        },

        render: function(){
            this.$el.html(this.template());

            return this;
        },

        logout: function(e){
            e.preventDefault();

            this.model.save();
        }

    });
});