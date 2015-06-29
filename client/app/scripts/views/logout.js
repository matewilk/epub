define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        JST = require('templates'),
        SessionModel = require('globals/session');

    return Backbone.View.extend({
        model: SessionModel,

        template: JST['app/scripts/templates/logout.hbs'],

        events: {
            //'submit form': 'logout'
            'click form button[type="submit"]': 'logout'
        },

        initialize: function(){
            this.listenTo(this.model, 'change', this.render)
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            // || needs to delegate events as event of the view were removed
            // \/ on this.$el.html of the parent view
            this.delegateEvents();
            return this;
        },

        logout: function(e){
            e.preventDefault();

            this.model.destroy({
                success: this.redirect.bind(this),
                wait: true
            });
        },

        redirect: function(model, response){
            //is it correct way to check on response and not on model itself ?
            if(!response.authenticated){
                Backbone.trigger('router:go', 'login')
            }
        }

    });
});