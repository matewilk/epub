
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
    "spec/models/book",
    "spec/collections/library",
    "spec/views/registration",
    "spec/urls"
], function() {
    if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
    else { mocha.run(); }
});