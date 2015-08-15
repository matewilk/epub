define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        JST = require('templates'),
        Dropzone = require('dropzone'),
        Dialog = require('views/dialogs/dialog');

    return Backbone.View.extend({
        template: JST['app/scripts/templates/main.hbs'],

        events: {
            'submit form': 'upload'
        },

        render: function () {
            this.$el.html(this.template());

            this.dropzone = new Dropzone(this.$el.find('form')[0],{
                url: "/api/upload",
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
                            //TODO: show appropriate dialog
                            alert('Sorry, guest users can upload only one book');
                        }
                    });
                }
            });

            return this;
        }
    });
});
