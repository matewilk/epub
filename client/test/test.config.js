require.config({

    baseUrl: '.',

    paths: {
        app: "../app/scripts/app",
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
        react: "../app/bower_components/react/react-with-addons",
        "backbone-react": "../app/bower_components/backbone-react-component/lib/component"
    },

    shim: {
        bootstrap: {
            deps: ["jquery"],
            exports: 'jquery'
        }
    },

    //map views for testing purposes
    //in tests, the epubjsMock dependency is defined
    //in scripts there is no epubjsMock dependency nor mapping in requirejs config file
    //so it falls back to the original library
    map: {
        'views/pages/reader': {
            'epubjs': 'epubjsMock'
        },
        'spec/views/reader': {
            'epubjs': 'epubjsMock'
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
    "spec/views/library",
    //reac views
    "spec/views/react/translation",

    //structure
    "spec/urls",

    //app
    "spec/router"
], function() {
    if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
    else { mocha.run(); }
});
