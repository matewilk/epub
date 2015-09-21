define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        JST = require('templates'),
        ePub = require('epubjs');

    require('epubhooks/selection');

    var Reader = Backbone.View.extend({

        id: 'reader',

        events: {
            'click #next': 'nextPage',
            'click #prev': 'prevPage'
        },

        template: JST['app/scripts/templates/reader.hbs'],

        initialize: function (id) {
            this.area = $('<div id="iframe-placeholder"></div>');
            this.book = new ePub("/api/reader/"+id, { restore: true });

            //this.book.getCurrentLocationCfi();
            //this.book.gotoCfi("/6/6[the-worcesters-at-the-first-battle-of-ypres]!4/2[days-to-remember]/28/2/1:440");

            this.book.renderTo(this.area[0]);
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
            var prevPage = this.book.renderer.prevPage();
            if(!prevPage){
                var prevChapter = this.book.prevChapter();
                if(!prevChapter){
                    this.book.gotoHref(this.book.spine[0].url);
                }
            }
        }
    });

    return Reader;
});