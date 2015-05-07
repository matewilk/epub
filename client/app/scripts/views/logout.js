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

            this.model.fetch({
                success: this.redirect.bind(this)
            });
        },

        redirect: function(model, response){
            if(response.logout){
                this.model.set({show: !response.logout});
                Backbone.trigger('router:go', 'login')
            }
        }

    });
});