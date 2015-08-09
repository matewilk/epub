define(function(require){
    'use strict';

    var Dialog = require('views/dialog'),
        JST = require('templates');

    return Dialog.extend({

        className: 'modal',

        template: JST['app/scripts/templates/modal.hbs'],

        events: {
            'click button#accept': 'onAccept'
        },

        initialize: function(options) {
            this.options = options;

            $('body').append(this.render().$el);
            this.onModalInit();
            this.showModal();
        },

        render: function(){
            this.$el.html(this.template(this.options));

            return this;
        },

        onModalInit: function(){
            var self = $(this.$el);
            var dialog = self.find('.modal-dialog');
            self.on('show.bs.modal', function(e){
                self.css({display: 'block'});
                self.height = dialog.height() + parseInt(dialog.css('margin-top'));
                dialog.css({top: -self.height});
                dialog.removeClass('invisible');
                dialog.animate({top: 10}, {duration: 400, easing: 'easeOutElastic'});

            });

            self.on('hide.bs.modal', function(){
                //60 added to animation so that shadow is hiding as well
                dialog.animate({top: -self.height - 80}, 400, 'easeInOutElastic', function(){
                    $(self).addClass('invisible');
                });

                _.delay(_.bind(self.remove, self), 1000);
            });

            //prevent hiding the dialog before hide animation ends
            self.on('hidden.bs.modal', function(){
                self.css({display: 'block'});
            });
        },

        showModal: function(){
            $(this.$el).modal({backdrop: 'static'});
        },

        onAccept: function(){
            if(this.options.callback) this.options.callback();
            $(this.$el).modal('hide');
        }
    });
});
