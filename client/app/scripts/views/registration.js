define(function(require){

    var $ = require('jquery'),
        Backbone = require('backbone'),
        JST = require('templates'),
        RegistrationModel = require('models/registration'),
        FormView = require('views/form');

    return FormView.extend({

        model: RegistrationModel,

        template: JST['app/scripts/templates/registration.hbs'],

        events: {
            'submit form': 'register'
        },

        initialize: function(){
            //after extending tests doesn't run without this!!!
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
