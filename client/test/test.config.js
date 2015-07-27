
require.config({

    baseUrl: '.',

    paths: {
        globals: "../app/scripts/globals",
        scripts: "../app/scripts",
        models: "../app/scripts/models",
        collections: '../app/scripts/collections',
        views: '../app/scripts/views',
        jquery: "../app/bower_components/jquery/dist/jquery",
        backbone: "../app/bower_components/backbone/backbone",
        underscore: "../app/bower_components/underscore/underscore",
        handlebars: '../app/bower_components/handlebars/handlebars',
        templates: "../.tmp/scripts/templates",
        "jquery-cookie": '../app/bower_components/jquery-cookie/jquery.cookie',
        dropzone: "../app/bower_components/dropzone/dist/dropzone-amd-module"
    }
});

require([
    //models
    "spec/models/book",
    "spec/models/registration",
    "spec/models/dialog",
    "spec/models/login",
    "spec/models/session",

    //collections
    "spec/collections/library",

    //views
    "spec/views/form",
    "spec/views/registration",
    "spec/views/dialog",
    "spec/views/login",
    "spec/views/logout",
    "spec/views/home",
    "spec/views/book",

    //structure
    "spec/urls"
], function() {
    if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
    else { mocha.run(); }
});