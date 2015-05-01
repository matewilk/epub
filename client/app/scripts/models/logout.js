define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        apiUrls = require('scripts/urls');

    return Backbone.Model.extend({
        defaults: {
            show: false
        },

        url: apiUrls.getUrl('logout'),

        initialize: function(){
            this.listenTo(Backbone, 'session:change', this.setProps)
        },

        setProps: function(authenticated){
            this.set({show: authenticated});
        }
    });
});