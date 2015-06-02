define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        apiUrls = require('globals/urls');

    return Backbone.Model.extend({

        //url: apiUrls.getUrl('reader')

        parse: function(response){
            return {
                snippet: response
            }
        }

//        fetch: function(options) {
//            return Backbone.Model.prototype.fetch.call(this, _.extend({ dataType: "html"}, options));
//        }

    });
});
