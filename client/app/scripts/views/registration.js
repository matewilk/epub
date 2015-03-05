define(function(require){

    var $ = require('jquery'),
        Backbone = require('backbone'),
        //TODO problem with attaching templates to tests
        JST = require('templates');

    return Backbone.View.extend({

        template: JST['app/scripts/templates/registration.hbs'],

        initialize: function(){

        },

        render: function(){

        }

    });

});
