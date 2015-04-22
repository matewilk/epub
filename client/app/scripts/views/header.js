define(function(require){
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        JST = require('templates'),
        HeaderModel = require('models/header'),
        LogoutView = require('views/logout');

    var HeaderView = Backbone.View.extend({

        template: JST['app/scripts/templates/header.hbs'],

        el: '.header',

        initialize: function() {
            this.model = new HeaderModel();
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$('.header-right').append(new LogoutView().render().el);
        }
    });

    return HeaderView;
});
