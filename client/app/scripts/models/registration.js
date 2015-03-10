define(function (require) {
    'use strict';

    var Backbone = require('backbone');

    var RegistrationModel = Backbone.Model.extend({

        defaults: {
            name: '',
            email: '',
            password: ''
        },

        parse: function(response)  {
            return response;
        },

        validate: function(attrs, options) {

        }
    });

    return RegistrationModel;
});