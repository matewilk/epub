define(function(require) {
   'use strict';

    var BookModel = require('models/book'),
        Library = require('collections/library');

    describe("Library Collection", function() {
        beforeEach(function(){
            this.server = sinon.fakeServer.create();
            this.server.autoRespond = true;

            this.libraryCollection = new Library();
        });

        afterEach(function(){
            this.server.restore();
        });

        describe("creation", function() {
            it("has default values", function() {
                expect(this.libraryCollection).to.be.ok;
                expect(this.libraryCollection).to.have.length(0);
            });

            it("should be empty on fetch", function(done) {
                var libraryCollection = this.libraryCollection
                this.server.respondWith("GET", "library", [
                    200,
                    { "Content-Type": "application/json" },
                    '[]'
                ]);

                this.libraryCollection.once("reset", function() {
                    expect(libraryCollection).to.have.length(0);

                    done();
                });

                this.libraryCollection.fetch({reset: true});
            });
        });

        it("should have a correct api url", function() {
            expect(this.libraryCollection.url).to.equal("library");
        });

        it("should have a book model", function() {
            //expect(this.libraryCollection.model).to.deep.equal(BookModel);
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
