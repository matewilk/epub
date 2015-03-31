define(function (require) {
    'use strict';

    var FormModel = require('models/form'),
        apiUrls = require('scripts/urls');

    var RegistrationModel = FormModel.extend({

        url: apiUrls.getUrl('registration'),

        defaults: {
            name: {value: '', required: true},
            email: {value: '', required: true},
            password: {value: '', required: true}
        },

        parse: function(response)  {
            return response;
        },

        validate: function(attrs, options) {
            var errors = [];

            var basicErrors = FormModel.prototype.validate.apply(this, arguments);

            /**
             * TODO check if email and password are same in both fields
             */

            if(basicErrors && basicErrors.length > 0) errors = errors.concat(basicErrors);

            if(errors.length > 0) return errors;
        }
    });

    return RegistrationModel;
});