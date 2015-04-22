define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        apiUrls = require('scripts/urls');

    return Backbone.Model.extend({
        url: apiUrls.getUrl('logout')
    });
});