define(function(require){
    'use strict';

    var FormModel = require('models/form'),
        apiUrls = require('scripts/urls');

    return FormModel.extend({

        url: apiUrls.getUrl('login'),

        defaults: {
            email: {value: '', required: true},
            password: {value: '', required: true}
        },

//        defaults: {
//            email: '',
//            password: '',
//        },
//
//        required: ['email', 'password'],

        validate: function(attrs, options){
            var errors = [];

            var basicErrors = FormModel.prototype.validate.apply(this, arguments);

            if(basicErrors && basicErrors.length > 0) errors = errors.concat(basicErrors);

            if(errors.length > 0) return errors;
        }
    });
});