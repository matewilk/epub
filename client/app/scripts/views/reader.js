define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        JST = require('templates'),
        ReaderModel = require('models/reader'),
        apiUrls = require('globals/urls');

    var Reader = Backbone.View.extend({

        model: new ReaderModel(),

        template: JST['app/scripts/templates/reader.hbs'],

        initialize: function (id) {
            this.model.set({id: id});
            this.model.url = apiUrls.getUrl('reader', id);
            this.model.fetch({
                dataType: 'html'
            });
            this.listenTo(this.model, 'change', this.render);
        },

        success: function(){
            this.render();
        },

        error: function(){
            debugger;
        },

        render: function () {
            this.$el.html($.parseHTML(this.model.get('snippet')));

            return this;
        }
    });

    return Reader;
});