require.config({

    baseUrl: '.',

    paths: {
        globals: "../app/scripts/globals",
        scripts: "../app/scripts",
        models: "../app/scripts/models",
        collections: '../app/scripts/collections',
        views: '../app/scripts/views',
        helpers: '../app/scripts/helpers',
        jquery: "../app/bower_components/jquery/dist/jquery",
        backbone: "../app/bower_components/backbone/backbone",
        underscore: "../app/bower_components/underscore/underscore",
        handlebars: '../app/bower_components/handlebars/handlebars',
        templates: "../.tmp/scripts/templates",
        bootstrap: '../app/bower_components/bootstrap/dist/js/bootstrap',
        "jquery-cookie": '../app/bower_components/jquery-cookie/jquery.cookie',
        dropzone: "../app/bower_components/dropzone/dist/dropzone-amd-module",
        velocity: "../app/bower_components/velocity/velocity",
        epubjs: "../app/bower_components/epubjs/build/epub",
        epubhooks: "../app/scripts/epubhooks",
        react: "../app/bower_components/react/react",
        "backbone-react": "../app/bower_components/backbone-react-component/lib/component"
    },

    shim: {
        bootstrap: {
            deps: ["jquery"],
            exports: 'jquery'
        }
    }
});

require([
    "bootstrap",
    //models
    "spec/models/book",
    "spec/models/registration",
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
    "spec/views/menu",
    "spec/views/reader",

    //structure
    "spec/urls"
], function() {
    if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
    else { mocha.run(); }
});
