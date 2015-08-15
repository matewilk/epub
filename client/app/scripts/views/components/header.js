define(function(require){
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        JST = require('templates'),
        HeaderModel = require('models/header'),
        LogoutView = require('views/components/logout'),
        MainMenu = require('views/components/menu');

    return Backbone.View.extend({

        template: JST['app/scripts/templates/header.hbs'],

        el: '.header-wrapper',

        initialize: function() {
            this.model = new HeaderModel();

            this.logoutButton = new LogoutView();
            this.mainMenu = new MainMenu();
            this.listenTo(this.model, 'change:title', this.updateTitle);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            //this.$('.header-right).append(this.logoutButton.render().$el)'
            this.$('.header-right').append(this.logoutButton.$el);
            this.$('.header-right').append(this.mainMenu.render().$el);
        },

        /**
         * updateTitle
         * find div and replace innerHTML
         */
        updateTitle: function() {
            this.$('.header-left #title').text(this.model.get('title'));
        }
    });
});
