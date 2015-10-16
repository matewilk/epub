define(function(require) {
   'use strict';

    var Backbone = require('backbone'),
        Header = require('views/components/header'),
        Footer = require('views/components/footer'),
        Login = require('views/pages/login'),
        Library = require('views/pages/library'),
        MainPage = require('views/pages/home'),
        Reader = require('views/pages/reader'),
        Router = require('app');

    describe("Router", function() {
        beforeEach(function(){
            sinon.spy(Header.prototype, 'render');
            sinon.spy(Header.prototype, 'initialize');

            sinon.spy(Footer.prototype, 'render');
            sinon.spy(Footer.prototype, 'initialize');

            sinon.spy(MainPage.prototype, 'initialize');

            sinon.spy(Router.prototype, 'listenTo');
            sinon.spy(Router.prototype, 'navigate');
            sinon.spy(Router.prototype, 'defaultRoute');
            sinon.spy(Router.prototype, 'showView');

            this.router = new Router();
            Backbone.history.start();
        });

        afterEach(function(){
            Header.prototype.render.restore();
            Header.prototype.initialize.restore();

            Footer.prototype.render.restore();
            Footer.prototype.initialize.restore();

            MainPage.prototype.initialize.restore();

            Router.prototype.listenTo.restore();
            Router.prototype.navigate.restore();
            Router.prototype.defaultRoute.restore();
            Router.prototype.showView.restore();

            Backbone.history.stop();
        });

        describe('On initialize', function(){
            it('should initialize and render the Header', function(){
                expect(Header.prototype.initialize.called).to.be.true;
                expect(Header.prototype.render.called).to.be.true;
            });

            it('should initialize and render the Footer', function(){
                expect(Footer.prototype.initialize.called).to.be.true;
                expect(Footer.prototype.render.called).to.be.true;
            });

            it('should listen to backbone "router:go" event', function(){
                expect(this.router.listenTo.calledWith(
                  Backbone, 'router:go', this.router.go
                )).to.be.true;
            });

            describe('Render default view', function() {
                it('should call defaultRoute function', function(){
                    expect(this.router.defaultRoute.calledOnce).to.be.true;
                });

                it('should call showView function', function() {
                    expect(this.router.showView.calledOnce).to.be.true;
                });

                it('should call MainPage view initialize function', function(){
                    expect(MainPage.prototype.initialize.calledOnce).to.be.true;
                });
            });
        });

        it('routes object should contain proper key values', function(){
            expect(Router.prototype.routes).to.deep.equal(
                {
                    'login': 'showLogin',
                    'library': 'showLibrary',
                    'books/:id': 'showBook',
                    'reader/:id': 'reader',
                    '*path': 'defaultRoute'
                }
            );
        });

        describe('Routes', function(){
            beforeEach(function(){
                sinon.spy(this.router, 'showLogin');
                sinon.spy(Router.prototype, 'showLibrary');
                sinon.spy(Router.prototype, 'reader');

                sinon.spy(this.router.header.model, 'set');
            });

            afterEach(function(){
                Router.prototype.showLogin.restore();
                Router.prototype.showLibrary.restore();
                Router.prototype.reader.restore();
            });

            it('login route should initialize login view', function(done){

                this.router.on('route:showLogin', function(){
                  expect(Router.prototype.showLogin.calledOnce).to.be.true;
                  expect(Login.prototype.initialize.calledOnce).to.be.true;
                  expect(this.router.header.mode.set.calledWith('title', 'Login')).to.be.true;

                  done();
                }, this);

                this.router.navigate('login', {trigger:true});
            });
        });
    });
});
