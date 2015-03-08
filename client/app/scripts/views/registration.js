define(function(require){

    var $ = require('jquery'),
        Backbone = require('backbone'),
        JST = require('templates');

    return Backbone.View.extend({

        template: JST['app/scripts/templates/registration.hbs'],

        render: function(){
            this.$el.html(this.template());

            return this;
        }

    });

});
