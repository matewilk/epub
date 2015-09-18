define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        JST = require('templates'),
        animations = require('helpers/animations');

    return Backbone.View.extend({

        className: 'dialog absolute-centered',

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

            animations.dialogShow(this.$alert, this.height);
            _.delay(_.bind(this.hide, this), this.delay);
        },

        hide: function(){
            animations.dialogHide(this.$alert, this.height, _.bind(this.remove, this));
        }
    });
});