define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        _ = require('underscore');

    return Backbone.View.extend({

        initialize: function(){
            _.bind(this.showError, this);
            this.listenTo(this.model, "invalid", this.onInvalid);
        },

        getField: function(name){
            return this.$el.find('input[name="'+ name +'"]');
        },

        submitForm: function(formId){
            var self = this;
            this.$('#'+formId+' :input').each(function (index, el) {
                self.model.set($(el).attr('name'), $(el).val())
            });

            this.model.save();
        },

        onInvalid: function(model, errors){
            _.each(errors, function(error){
                this.showError(error.field, error.message);
            }, this);
        },

        showError: function(inputName, message){
            var input = this.getField(inputName);

            this.clearError(input);

            input.addClass('invalid')
                .after('<p class="errorMessage">'+ message +'</p>');
        },

        clearError: function(input){
            input.removeClass('invalid').next().remove('.errorMessage');
        }

    });
});
