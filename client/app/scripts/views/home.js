define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        JST = require('templates');

    var HomePage = Backbone.View.extend({
        template: JST['app/scripts/templates/main.hbs'],

        events: {
            'submit form': 'upload'
        },

        render: function () {
            this.$el.html(this.template());

            return this;
        },

        upload: function(e){
            e.preventDefault();

            var data = new FormData(this.$('#upload-form')[0]);

            jQuery.ajax({
                url: 'api/upload',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: function(data){
                    console.log('front end upload success');
                    console.log(data);
                }
            });
        }
    });

    return HomePage;
});