define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        JST = require('templates'),
        Dropzone = require('dropzone'),
        Dialog = require('views/dialogs/dialog');

    Dropzone.autoDiscover = false;

    return Backbone.View.extend({
        template: JST['app/scripts/templates/main.hbs'],

        events: {
            'submit form': 'upload'
        },

        initialize: function(){
            this.$el.html(this.template());

            this.dropzone = new Dropzone(this.$el.find('form')[0],{
                url: "/api/upload",
                acceptedFiles: 'application/epub+zip, application/epub, .epub',
                maxFiles: 1,
                maxFileSize: 10, //10MB
                init: function() {
                    this.on("success", function(file, response) {
                        //maybe add timeout so the user can see
                        //that something is going on
                        //or is it better to popup dialog ?
                        this.removeFile(file);
                        if(response.uploaded){
                            this.dialog = new Dialog({
                                title: 'Well done!',
                                message: 'The book has been successfully uploaded',
                                type: 'success'
                            });
                            Backbone.trigger('router:go', '/library');
                        } else {
                            new Dialog({
                                title: 'Sorry, One book allowed',
                                message: 'Guest users can keep only one book in the library',
                                type: 'warning'
                            });
                        }
                    });
                }
            });
        },

        render: function () {
            return this;
        }
    });
});
