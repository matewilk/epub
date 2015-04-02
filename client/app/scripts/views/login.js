define(function(require){
    'use strict';

    var FormView = require('views/form'),
        LoginModel = require('models/login'),
        JST = require('templates')

    return FormView.extend({
        model: new LoginModel(),

        template: JST['app/scripts/templates/login.hbs'],

        events: {
            'submit form': 'login'
        },

        initialize: function(){
            this.listenTo(this.model, 'sync', this.success);

            this.render();
        },

        render: function () {
            this.$el.html(this.template());

            return this;
        },

        login: function(e){
            e.preventDefault();
            this.submitForm(this.$el.find('form').attr('id'))
        },

        success: function(){
            var url = '/library';
            Backbone.trigger('login:success', {url: url})
        }
    });
});
