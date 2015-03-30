define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        JST = require('templates'),
        DialogModel = require('models/dialog');

    return Backbone.View.extend({

        className: 'dialog hidden',

        model: new DialogModel(),

        template: JST['app/scripts/templates/dialog.hbs'],

        /**
         * number of miliseconds after which element will be hidden
         */
        delay: 10000,

        initialize: function(options){
            this.model.set(
                {
                    title: options.title,
                    message: options.message
                }
            );

            this.render();
        },

        render: function(){
            this.$el.html(this.template(this.model.attributes));

            return this;
        },

        show: function(){
            this.$el.removeClass('hidden');
            _.delay(_.bind(this.hide, this), this.delay);
        },

        hide: function(){
            this.$el.addClass('hidden');

            //view removes itself after delay + 1000ms (in case any animation applies)
            _.delay(_.bind(this.remove, this), this.delay + 1000);
        }
    });
});