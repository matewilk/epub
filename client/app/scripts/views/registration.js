define(function(require){

    var JST = require('templates'),
        RegistrationModel = require('models/registration'),
        FormView = require('views/form');

    return FormView.extend({

        model: new RegistrationModel(),

        template: JST['app/scripts/templates/registration.hbs'],

        events: {
            'submit form': 'register'
        },

        initialize: function(){
            this.listenTo(this.model, 'sync', this.registrationSuccess)
        },

        render: function(){
            this.$el.html(this.template());

            return this;
        },

        register: function(e){
            e.preventDefault();
            this.submitForm(this.$el.find('form').attr('id'));
        },

        registrationSuccess: function(){

        }
    });
});
