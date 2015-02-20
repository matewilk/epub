define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
], function ($, _, Backbone, JST) {
    'use strict';

    var LoginView = Backbone.View.extend({
        template: JST['app/scripts/templates/login.hbs'],

        events: {
            'submit form': 'login'
        },

        login: function(e){
            e.preventDefault();
            var data = {};
            var inputs = this.$('input');
            $.each(inputs, function(index, item){
                data[$(item).attr('name')] = $(item).val();
            });
            this.submit(data)
        },

        submit: function(data) {
            $.ajax({
                method: 'POST',
                url: 'login',
                data: data,
                success: this.success,
                error: this.error
            })
        },

        success: function(){
            var url = '/library';
            Backbone.trigger('login:success', {url: url})
        },

        render: function () {
            this.$el.html(this.template());

            return this;
        }
    });

    return LoginView;
});
