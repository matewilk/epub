define(function(require){
    'use strict';

    var Backbone = require('backbone');

    return Backbone.View.extend({
        className: 'overlay',

        events: {
            'click': 'hide'
        },

        initialize: function(){
            this.render();
        },

        render: function(){
            document.body.appendChild(this.$el[0]);

            return this;
        },

        hide: function(e){
            //remove only if target is the mask itself
            if(e.target === this.$el[0]){
                //triggers event to clear selection
                Backbone.trigger('mask:hide');
                this.remove();
            }
        }
    });
});
