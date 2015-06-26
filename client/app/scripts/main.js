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
        globals: './globals',
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        handlebars: '../bower_components/handlebars/handlebars',
        templates: '../scripts/templates',
        "jquery-cookie": '../bower_components/jquery-cookie/jquery.cookie',
        epubjs: "../bower_components/epubjs/build/epub",
        jszip: "../bower_components/jszip/dist/jszip.min"
    }
});

require([
    'backbone',
    'app',
    'globals/session'
], function (Backbone, Application, SessionModel) {

    $(document).on('change', '.btn-file :file', function() {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });

    $(document).ready( function() {
        $('.btn-file :file').on('fileselect', function(event, numFiles, label) {

            var input = $(this).parents('.input-group').find(':text'),
                log = numFiles > 1 ? numFiles + ' files selected' : label;

            if( input.length ) {
                input.val(log);
            } else {
                if( log ) alert(log);
            }

        });
    });


    window.App = {
        session: SessionModel
    };
    new Application();

    Backbone.history.start({pushState: true});
});
