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

//        initialize: function(){
//            this.listenTo(Backbone, 'session:change', this.showHide)
//        },
//
//        showHide: function(show){
//            if(show){
//                this.render()
//            } else {
//                //TODO do I want to add/remove the view dynamically ?
//                //it can relay on parent view render instead
//                //after remove it's no longer listening for 'session:change'
//                this.remove();
//            }
//        },
        initialize: function(){
            this.listenTo(this.model, 'change', this.render)
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        logout: function(e){
            e.preventDefault();

            this.model.save();
        }

    });
});