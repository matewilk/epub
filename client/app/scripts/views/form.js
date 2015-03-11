define(function(require){
    'use strict';

    var Backbone = require('backbone')

    return Backbone.View.extend({

        getFieldValue: function(name){
            return this.$el.find('input[name="'+ name +'"]').val();
        }

    });
});
