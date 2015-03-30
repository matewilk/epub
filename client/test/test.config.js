
require.config({

    baseUrl: '.',

    paths: {
        scripts: "../app/scripts",
        models: "../app/scripts/models",
        collections: '../app/scripts/collections',
        views: '../app/scripts/views',
        jquery: "../app/bower_components/jquery/dist/jquery",
        backbone: "../app/bower_components/backbone/backbone",
        underscore: "../app/bower_components/underscore/underscore",
        handlebars: '../app/bower_components/handlebars/handlebars',
        templates: "../.tmp/scripts/templates"

    }
});

require([
    //models
    "spec/models/book",
    "spec/models/registration",

    //collections
    "spec/collections/library",

    //views
    "spec/views/form",
    "spec/views/registration",
    "spec/views/dialog",

    //structure
    "spec/urls"
], function() {
    if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
    else { mocha.run(); }
});