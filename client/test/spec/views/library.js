define(function(require) {
    'use strict';

    var LibraryView = require('views/pages/library'),
        BookModel = require('models/book'),
        LibraryCollection = require('collections/library'),
        JST = require('templates');

    describe("Library View", function() {
        beforeEach(function(){
            this.server = sinon.fakeServer.create();
            this.server.autoRespond = true;

            sinon.spy($.fn, 'html');
            sinon.spy($.fn, 'append');

            sinon.stub(LibraryCollection.prototype, 'initialize');
            sinon.spy(LibraryCollection.prototype, 'fetch');

            sinon.spy(LibraryView.prototype, 'onSuccess');
            sinon.spy(LibraryView.prototype, 'render');
            sinon.spy(LibraryView.prototype, 'renderBook');

            this.libraryView = new LibraryView();
            this.collection = this.libraryView.collection;
        });

        afterEach(function(){
            this.server.restore();
            $.fn.html.restore();
            $.fn.append.restore();
            LibraryCollection.prototype.initialize.restore();
            LibraryCollection.prototype.fetch.restore();

            LibraryView.prototype.onSuccess.restore();
            LibraryView.prototype.render.restore();
            LibraryView.prototype.renderBook.restore();
        });

        it("should have a proper template", function(){
            expect(this.libraryView.template).to.equal(JST['app/scripts/templates/library.hbs']);
        });

        describe('On initialize', function() {
            beforeEach(function(){
                this.server.respondWith("GET", "/api/library", [
                    200,
                    { "Content-Type": "application/json" },
                    '[]'
                ]);
            });

            it("should instantiate Library Collection ", function() {
                expect(LibraryCollection.prototype.initialize.calledOnce).to.be.true;
            });

            it("should fetch the collection", function() {
                expect(this.libraryView.collection.fetch.calledOnce).to.be.true;
            });

            it("should call #onSuccess() function on collection fetch", function(done){
                this.collection.on('sync', function(){
                    expect(this.libraryView.onSuccess.calledOnce).to.be.true;

                    done();
                }, this);

                this.collection.fetch();
            });

            it("should call #render() on successfull collection fetch", function(done){
                this.collection.on('sync', function(){
                    expect(this.libraryView.render.calledOnce).to.be.true;

                    done();
                }, this);

                this.collection.fetch();
            });

            it.skip("should render the template into el html", function(){
                //this.collection.on('sync', function(){
                //    expect(this.libraryView.$el.html.called).to.be.true;
                //
                //    done();
                //}, this);
                //
                //this.collection.fetch();
            });

            it.skip("should render book view on successful collection fetch", function(){
                //this.collection.on('sync', function(){
                //    expect(this.libraryView.renderBook.called).to.be.true;
                //
                //    done();
                //}, this);
                //
                //this.collection.fetch();
            });

            it.skip("should append book view to the element with .row class", function(){
                //this.collection.on('sync', function(){
                //    expect(this.libraryView.$.fn.append.called).to.be.false;
                //
                //    done();
                //}, this);
                //
                //this.collection.fetch();
            })
        });

        it("should display the spinner on collection fetch", function() {

        });

    });
});
