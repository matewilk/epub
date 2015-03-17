define(function (require) {
    'use strict';

    var Backbone = require('backbone'),
        apiUrls = require('scripts/urls');

    var RegistrationModel = Backbone.Model.extend({

        url: apiUrls.getUrl('registration'),

        defaults: {
            name: '',
            email: '',
            password: ''
        },

        parse: function(response)  {
            return response;
        },

        validate: function(attrs, options) {
            var errors = [];

            if(attrs.name.length === 0){
                errors.push({name: 'name', message: 'Field cannot be empty'});
            }
            if(attrs.email.length === 0){
                errors.push({name: 'email', message: 'Field cannot be empty'});
            }
            if(attrs.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/) === null){
                errors.push({name: 'email', message: "It's not valid email address"});
            }
            if(attrs.password.length ===0){
                errors.push({name: 'password', message: 'Field cannot be empty'});
            }

            if(errors.length > 0) return errors;
        }
    });

    return RegistrationModel;
});