define(function(require){
    'use strict';

    var Backbone = require('backbone')

    return Backbone.View.extend({

        initialize: function(){
            this.listenTo(this.model, "invalid", this.onInvalid);
        },

        getFieldValue: function(name){
            return this.$el.find('input[name="'+ name +'"]').val();
        },

        submitForm: function(formId){
            var self = this;
            this.$('#'+formId+' :input').each(function (index, el) {
                self.model.set($(el).attr('name'), $(el).val())
            });

            this.model.save();
        },

        onInvalid: function(model, errors){

        },

        showError: function(input, message){
            input.addClass('invalid')
                .after('<p class="errorMessage">'+ message +'</p>');
        },

        clearError: function(input){
            input.removeClass('invalid').next().remove('.errorMessage');
        }

    });
});
