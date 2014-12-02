define(function (require) {
    'use strict';

    var Backbone = require('backbone');

    var BookModel = Backbone.Model.extend({

        defaults: {
            title: 'Book Title',
            author: 'Unknown Author',
            isbn: 'isbn'
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return BookModel;
});
