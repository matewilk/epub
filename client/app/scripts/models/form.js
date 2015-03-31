define(function (require) {
    'use strict';

    var Backbone = require('backbone');

    return Backbone.Model.extend({

        validate: function(attrs, options) {
            var errors = [];

            _.each(attrs, function(attr, index, list){
                if(attr.required && !attr.value){
                    errors.push({name: index, message: 'Field "'+index+'" cannot be empty'});
                }
                if(index === 'email' && attr.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/) === null){
                    errors.push({name: 'email', message: "It's not a valid email address"});
                }
            });

            if(errors.length > 0) return errors;
        }
    });
});