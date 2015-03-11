define(function(require){
    'use strict';

    var Backbone = require('backbone')

    return Backbone.View.extend({

        getFieldValue: function(name){
            return this.$el.find('input[name="'+ name +'"]').val();
        },

        submitForm: function(formId){
            var self = this;
            this.$('#'+formId+' :input').each(function (index, el) {
                self.model.set($(el).attr('name'), $(el).val())
            });

            this.model.save();
        }

    });
});
