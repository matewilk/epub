/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var HeaderModel = Backbone.Model.extend({
        defaults: {
            title: 'Default',
            showSearch: true,
            showHamburgerMenu: true,
            showUserMenu: true
        }
    });

    return HeaderModel;
});
