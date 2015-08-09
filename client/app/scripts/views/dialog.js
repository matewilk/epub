define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        JST = require('templates');

    return Backbone.View.extend({

        className: 'dialog invisible absolute-centered',

        template: JST['app/scripts/templates/dialog.hbs'],

        /**
         * number of miliseconds after which element will be hidden
         */
        delay: 5000,

        initialize: function(options){
            this.options = options;

            $('body').append(this.render().$el);
            this.show();
        },

        render: function(){
            this.$el.html(this.template(this.options));

            return this;
        },

        show: function(){
            this.$alert = this.$('.alert');
            this.height = this.$el.height();

            this.$alert.css({top: -this.height});
            this.$el.removeClass('invisible');
            this.$alert.animate({top: 10}, {duration: 400, easing: 'easeOutElastic'});

            _.delay(_.bind(this.hide, this), this.delay);
        },

        hide: function(){
            this.$alert.animate({top: -this.height}, 400, 'easeInOutElastic', function(){
                this.$el.addClass('invisible');
            }.bind(this));

            //view removes itself after 1000ms (in case any animation applies)
            _.delay(_.bind(this.remove, this), 1000);
        }
    });
});