define(function(require){
    'use strict';

    var Dialog = require('views/dialog'),
        JST = require('templates');

    return Dialog.extend({

        className: 'modal',

        template: JST['app/scripts/templates/modal.hbs'],

        initialize: function(options) {
            this.options = options;

            $('body').append(this.render().$el);
            this.onModalShow();
            this.showModal();
        },

        render: function(){
            this.$el.html(this.template(this.options));

            return this;
        },

        onModalShow: function(){
            var self = $(this.$el);
            self.on('show.bs.modal', function(e){
                  //add class invisible to hbs if you want to use it
                self.css({display: 'block'});
                var dialog = self.find('.modal-dialog');
                var height = dialog.height();

                dialog.css({top: -height});
                dialog.removeClass('invisible');
                dialog.animate({top: 10}, {duration: 400, easing: 'easeOutElastic'});

                //e.preventDefault();
            });
        },

        showModal: function(){
            $(this.$el).modal({backdrop: 'static'});
        }
    });
});
