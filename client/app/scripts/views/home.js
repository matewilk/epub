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
            var self = this;
            e.preventDefault();

            var data = new FormData(this.$('#upload-form')[0]);

            jQuery.ajax({
                url: 'api/upload',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                xhr: function(evt){
                    var myXhr = $.ajaxSettings.xhr();
                    if(myXhr.upload){ // Check if upload property exists
                        myXhr.upload.addEventListener('progress',self.progressHandlingFunction, false); // For handling the progress of the upload
                    }
                    return myXhr;
                },
                success: function(data){
                    console.log('front end upload success');
                    console.log(data);
                }
            });
        },

        progressHandlingFunction: function (e){
            if(e.lengthComputable){
                console.log(e.loaded+" "+e.total);
                $('progress').attr({value:e.loaded,max:e.total});
            }
        }
    });

    return HomePage;
});