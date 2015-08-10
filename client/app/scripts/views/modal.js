define(function(require){
    'use strict';

    var Dialog = require('views/dialog'),
        JST = require('templates');

    return Dialog.extend({

        className: 'modal',

        attributes: {
            "data-easein": "bounceDownI"
        },

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
                dialog.velocity({top: 10}, 390, [500, 20]);

            });

            self.on('hide.bs.modal', function(){
                //80 added to animation so that shadow is hiding as well
                dialog.velocity({top: -self.height - 80}, 400, [500, 20], function(){
                    $(self).addClass('invisible');
                    self.remove();
                });
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
