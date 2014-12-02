define(function(require) {
   'use strict';

    var BookModel = require('../../../app/scripts/models/book'),
        Library = require('../../../app/scripts/collections/library');

    describe("Library Collection", function() {
        beforeEach(function(){
            this.libraryCollection = new Library;
        });

        it("should have a correct api url", function() {

        });

        it("should fetch the data", function() {

        });

        it("should trigger fetch event", function() {
            //http://tbranyen.com/post/how-to-indicate-backbone-fetch-progress - spinner on load please
        });

        it("should instantiate book model", function() {

        });

        it("should contain book model collection", function() {

        });
    });
});
