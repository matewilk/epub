/*global require*/
'use strict';

require.config({
    shim: {
        bootstrap: {
            deps: ["jquery", "jquery-easing"],
            exports: 'jquery'
        },
        ripples : {
            deps: ["jquery", 'arrive']
        },
        material: {
            deps: ["bootstrap", 'ripples']
        },
        "jquery-easing": {
            deps: ["jquery"]
        }
    },
    paths: {
        scripts: '../scripts',
        globals: './globals',
        jquery: '../bower_components/jquery/dist/jquery',
        "jquery-easing": '../bower_components/jquery-easing-original/jquery.easing',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        material: '../bower_components/bootstrap-material-design/dist/js/material',
        arrive: '../bower_components/arrive/src/arrive',
        ripples: '../bower_components/bootstrap-material-design/dist/js/ripples',
        handlebars: '../bower_components/handlebars/handlebars',
        templates: '../scripts/templates',
        "jquery-cookie": '../bower_components/jquery-cookie/jquery.cookie',
        epubjs: "../bower_components/epubjs/build/epub",
        jszip: "../bower_components/jszip/dist/jszip.min",
        dropzone: "../bower_components/dropzone/dist/dropzone-amd-module"
    }
});

require([
    'backbone',
    'app',
    'globals/session',
    'bootstrap',
    'material'
], function (Backbone, Application, SessionModel) {

    $(document).ready( function() {
        $.material.init();
    });

    window.App = {
        session: SessionModel
    };
    new Application();

    Backbone.history.start({
        pushState: true,
        hasChange: false
    });
});
