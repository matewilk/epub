define(function(require) {
    'use strict';

    var LibraryView = require('views/pages/library'),
        BookView = require('views/components/book'),
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

            sinon.stub(BookView.prototype, 'initialize');
            sinon.stub(BookView.prototype, 'render').returns({el: function(){}});

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

            BookView.prototype.initialize.restore();
            BookView.prototype.render.restore();
        });

        it("should have a proper template", function(){
            expect(this.libraryView.template).to.equal(JST['app/scripts/templates/library.hbs']);
        });

        describe('On initialize', function() {
            beforeEach(function(){
                this.server.respondWith("GET", "/api/library", [
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({test: true})
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

            it("should render the template into el html", function(done){
                this.collection.on('sync', function(){
                    expect(this.libraryView.$el.html.calledWith(
                        this.libraryView.template({
                            count: this.collection.length
                        })
                    )).to.be.true;

                    done();
                }, this);

                this.collection.fetch();
            });

            it("should render book view on successful collection fetch", function(done){
                this.collection.on('sync', function(){
                    expect(this.libraryView.renderBook.called).to.be.true;

                    done();
                }, this);

                this.collection.fetch();
            });

            it("should append book view to the element with .row class", function(done){
                this.collection.on('sync', function(){
                    expect(this.libraryView.$el.append.called).to.be.true;

                    done();
                }, this);

                this.collection.fetch();
            })
        });

        it("should display the spinner on collection fetch", function() {

        });

    });
});
