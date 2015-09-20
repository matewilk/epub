define(function(require){
   'use strict';

    var BookView = require('views/components/book'),
        Modal = require('views/dialogs/modal'),
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
                this.spyModalView = sinon.spy(Modal.prototype, 'initialize');
                this.book.render();
                this.book.$('a#open').click();
            });

            afterEach(function(){
                Modal.prototype.initialize.restore();
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

                it('should open modal window passing callback function', function(){
                    sinon.assert.calledWith(this.spyModalView, {
                      callback: sinon.match.func,
                      message: "Are you sure you want to delete the book?",
                      title: "Delete book"
                    });
                    expect(this.book.modal).is.an.instanceof(Modal);
                });

                it('should call model destroy method after book delete button click', function(){
                    this.book.modal.$('button#accept').click();
                    expect(this.book.model.destroy.called).to.be.true;
                });

                it('should call deleteBookCallback function on delete success', function(done){
                    this.book.model.once('sync', function(){
                        expect(this.book.deleteBookCallback.calledOnce).to.be.true;

                        done();
                    }, this);
                    this.book.modal.$('button#accept').click();
                });

                it('should redirect to home page after book delete success', function(done){
                    this.book.model.once('sync', function(){
                        expect(this.trigger.calledWith('router:go', '/')).to.be.true;

                        done();
                    }, this);
                    this.book.modal.$('button#accept').click();
                });
            });
        });
    });
});
