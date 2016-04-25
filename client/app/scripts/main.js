/*global require*/
'use strict';

require.config({
    shim: {
        bootstrap: {
            deps: ["jquery"],
            exports: 'jquery'
        },
        arrive: {
            deps: ['jquery']
        },
        ripples : {
            deps: ["jquery", 'arrive']
        },
        material: {
            deps: ["bootstrap", 'ripples']
        },
        velocity: {
            deps: ["jquery"]
        }
    },
    paths: {
        scripts: '../scripts',
        globals: './globals',
        jquery: '../bower_components/jquery/dist/jquery',
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
        dropzone: "../bower_components/dropzone/dist/dropzone-amd-module",
        velocity: "../bower_components/velocity/velocity",
        react: "../bower_components/react/react",
        "backbone-react": "../bower_components/backbone-react-component/lib/component",
        "react-loader": "../bower_components/react-loader/lib/react-loader",
        "classnames": "../bower_components/classnames/index"
    }
});

require([
    'backbone',
    'app',
    'globals/session',
    'bootstrap',
    'material',
    'velocity'
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
