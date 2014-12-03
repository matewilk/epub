
require.config({

    baseUrl: '.',

    paths: {
        scripts: "../app/scripts",
        models: "../app/scripts/models",
        collections: '../app/scripts/collections',
        views: '../app/scripts/views',
        jquery: "../app/bower_components/jquery/dist/jquery",
        backbone: "../app/bower_components/backbone/backbone",
        underscore: "../app/bower_components/underscore/underscore"

    }
});

require([
    "spec/models/book",
    "spec/collections/library",
    "spec/urls"
], function() {
    if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
    else { mocha.run(); }
});