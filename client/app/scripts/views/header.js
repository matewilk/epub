define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/header'
], function ($, _, Backbone, JST, HeaderModel) {
    'use strict';

    var HeaderView = Backbone.View.extend({

        template: JST['app/scripts/templates/header.hbs'],

        el: '.header',

        initialize: function() {
            this.model = new HeaderModel();
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }
    });

    return HeaderView;
});
