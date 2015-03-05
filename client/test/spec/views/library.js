define(function(require) {
    'use strict';

    var LibraryView = require('views/library'),
        BookModel = require('models/book'),
        Library = require('collections/library');

    describe("Library View", function() {
        beforeEach(function(){
            this.libraryView = new LibraryView;
        });

        it("should instantiate Library Collection ", function() {

        });

        it("should display the spinner on collection fetch", function() {

        });

        it("should render itself on collection reset", function() {

        });
    });
});