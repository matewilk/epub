define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var FooterView = Backbone.View.extend({
        template: JST['app/scripts/templates/footer.hbs'],

        el: '.footer',

        render: function () {
            this.$el.html(this.template());

            return this;
        }
    });

    return FooterView;
});
