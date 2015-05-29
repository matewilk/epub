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
            this.model.fetch();
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });

    return Reader;
});