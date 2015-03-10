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

        }
    });

    return RegistrationModel;
});