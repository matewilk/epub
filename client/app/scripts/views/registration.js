define(function(require){

    var $ = require('jquery'),
        Backbone = require('backbone'),
        JST = require('templates'),
        RegistrationModel = require('models/registration');

    return Backbone.View.extend({

        model: RegistrationModel,

        template: JST['app/scripts/templates/registration.hbs'],

        events: {
            'submit form': 'register'
        },

        render: function(){
            this.$el.html(this.template());

            return this;
        },

        register: function(e){
            e.preventDefault();

        }

    });
});
