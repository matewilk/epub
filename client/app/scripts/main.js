/*global require*/
'use strict';

require.config({
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        scripts: '../scripts',
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        handlebars: '../bower_components/handlebars/handlebars',
        templates: '../scripts/templates',
        "jquery-cookie": '../bower_components/jquery-cookie/jquery.cookie'
    }
});

require([
    'backbone',
    'app',
    'models/session'
], function (Backbone, Application, SessionModel) {

    window.App = new Application();
    App.session = new SessionModel();
    Backbone.history.start();
});
