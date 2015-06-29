define(function(require){
    'use strict';

    //require('jszip');

    var Backbone = require('backbone'),
        JST = require('templates'),
        ReaderModel = require('models/reader'),
        apiUrls = require('globals/urls'),
        ePub = require('epubjs'),
        selection = require('epubhooks/selection');

    var Reader = Backbone.View.extend({

        id: 'reader',

        //model: new ReaderModel(),
        events: {
            'click #next': 'nextPage',
            'click #prev': 'prevPage'
        },

        template: JST['app/scripts/templates/reader.hbs'],

        initialize: function (id) {
            this.area = $('<div id="iframe-placeholder"></div>');
            this.book = ePub("/api/reader/"+id, { restore: true });

            this.book.renderTo(this.area[0]);
        },

        success: function(){
            this.render();
        },

        error: function(){
            debugger;
        },

        render: function () {
            this.$el.html(this.template());

            this.$('#area').html(this.area);

            return this;
        },

        nextPage: function(e){
            e.preventDefault();
            this.book.nextPage();
        },

        prevPage: function(e){
            e.preventDefault();
            this.book.prevPage();
        }
    });

    return Reader;
});