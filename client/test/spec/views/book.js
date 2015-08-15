define(function(require){
   'use strict';

    var BookView = require('views/components/book'),
        JST = require('templates');

    describe('Book View', function(){
        beforeEach(function(){
            var bookAttributes = {
                id: '1234',
                name: '98765',
                title: 'Boook title',
                isbn: 'isbn'
            };

            sinon.spy(Backbone.Model.prototype, 'destroy');

            var BookModel = Backbone.Model.extend({url: '/api/library'});

            this.trigger = sinon.stub(Backbone, 'trigger');
            sinon.spy(BookView.prototype, 'listenTo');
            sinon.spy(BookView.prototype, 'render');
            sinon.spy(BookView.prototype, 'openBook');
            sinon.spy(BookView.prototype, 'deleteBook');
            sinon.spy(BookView.prototype, 'deleteBookCallback');

            this.template = JST['app/scripts/templates/book.hbs'];
            this.book = new BookView({
                model: new BookModel(bookAttributes)
            });
        });

        afterEach(function(){
            Backbone.Model.prototype.destroy.restore();
            Backbone.trigger.restore();
            BookView.prototype.listenTo.restore();
            BookView.prototype.render.restore();
            BookView.prototype.openBook.restore();
            BookView.prototype.deleteBook.restore();
            BookView.prototype.deleteBookCallback.restore();
        });

        describe('Initialization', function(){
            it('should have a proper template', function(){
                expect(this.book.template()).to.equal(this.template());
            });

            it('should listen to model change on initialize', function(){
                expect(this.book.listenTo.calledWith(this.book.model, 'change', this.book.render)).to.be.true;
            });

            it('should render the template on model change', function(){
                this.book.model.trigger('change');
                expect(this.book.render.calledOnce).to.be.true;
            });
        });

        describe('After render', function(){
            beforeEach(function(){
                this.book.render();
                this.book.$('a#open').click();
            });
            describe('Open book event', function(){
                it('should open a book on open button click', function(){
                    expect(this.book.openBook.called).to.be.true;
                });

                it('should redirect to book view after open button click', function(){
                    expect(this.trigger.calledWith('router:go', '/reader/98765')).to.be.true;
                });
            });

            describe('Delete book event', function(){
                beforeEach(function(){
                    this.server = sinon.fakeServer.create();
                    this.server.autoRespond = true;
                    this.server.respondWith("DELETE", "/api/library", [
                        200,
                        { "Content-Type": "application/json" },
                        JSON.stringify({success: true})
                    ]);
                    this.book.$('a#delete').click();
                });
                it('should delete a book on delete button click', function(){
                    expect(this.book.deleteBook.called).to.be.true;
                });

                it('should call model destroy method after book delete button click', function(){
                    expect(this.book.model.destroy.called).to.be.true;
                });

                it('should call deleteBookCallback function on delete success', function(done){
                    this.book.model.once('sync', function(){
                        expect(this.book.deleteBookCallback.calledOnce).to.be.true;

                        done();
                    }, this);
                });

                it('should redirect to home page after book delete success', function(done){
                    this.book.model.once('sync', function(){
                        expect(this.trigger.calledWith('router:go', '/')).to.be.true;

                        done();
                    }, this);
                });
            });
        });
    });
});
