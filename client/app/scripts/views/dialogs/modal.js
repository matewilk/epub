define(function(require){
    'use strict';

    var Dialog = require('views/dialogs/dialog'),
        JST = require('templates'),
        animations = require('helpers/animations');

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
            var that = this;
            var dialog = self.find('.modal-dialog');
            self.on('show.bs.modal', function(e){
                self.css({display: 'block'});
                self.height = dialog.height() + parseInt(dialog.css('margin-top'));

                animations.dialogShow(dialog, self.height);

            });

            self.on('hide.bs.modal', function(){
                //80 added to animation so that shadow is hiding as well
                animations.dialogHide(dialog, self.height + 80, _.bind(that.remove, that));
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
