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
            sinon.spy(Router.prototype, 'showLogin');
            sinon.spy(Router.prototype, 'showLibrary');
            sinon.spy(Router.prototype, 'reader');

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
            Router.prototype.showLogin.restore();
            Router.prototype.showLibrary.restore();
            Router.prototype.reader.restore();

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
                    'reader/:id': 'reader',
                    '*path': 'defaultRoute'
                }
            );
        });

        describe('Routes', function(){
            beforeEach(function(){
                sinon.spy(Login.prototype, 'initialize');
                sinon.spy(Library.prototype, 'initialize');
                sinon.spy(Reader.prototype, 'initialize');

                sinon.spy(this.router.header.model, 'set');
            });

            afterEach(function(){
                Login.prototype.initialize.restore();
                Library.prototype.initialize.restore();
                Reader.prototype.initialize.restore();

                this.router.navigate('/');
            });

            it('login route should initialize login view', function(done){
                this.router.on('route:showLogin', function(){
                    expect(Router.prototype.showLogin.calledOnce).to.be.true;
                    expect(Login.prototype.initialize.calledOnce).to.be.true;
                    expect(this.router.header.model.set.calledWith('title', 'Login')).to.be.true;

                    done();
                }, this);

                this.router.navigate('login', {trigger:true});
            });

            it('library route should initialize library view', function(done){
                this.router.on('route:showLibrary', function(){
                    expect(Router.prototype.showLibrary.calledOnce).to.be.true;
                    expect(Library.prototype.initialize.calledOnce).to.be.true;
                    expect(this.router.header.model.set.calledWith('title', 'Library')).to.be.true;

                    done();
                }, this);

                this.router.navigate('library', {trigger: true});
            });

            it('reader route should initialize reader view', function(done){
                this.router.on('route:reader', function(){
                    expect(Router.prototype.reader.calledOnce).to.be.true;
                    expect(Reader.prototype.initialize.calledWith('123')).to.be.true;
                    expect(this.router.header.model.set.calledWith('title', 'Book')).to.be.true;

                    done();
                }, this);

                this.router.navigate('reader/123', {trigger: true});
            });
        });

        describe('#showView', function(){
            beforeEach(function(){
                //mocks global App obj
                window.App = {
                  session: {
                    check: function(){return true;}
                  }
                }
                sinon.spy(App.session, 'check');
                sinon.spy(Backbone.View.prototype, 'render');
            });
            afterEach(function(){
                App.session.check.restore();
                Backbone.View.prototype.render.restore();
            })

            it('should call session check if view requires authentication', function(){
                this.router.showView(new Backbone.View(), {requiresAuth: true});
                expect(App.session.check.calledOnce).to.be.true;
            });

            it('should display a view straigh away if authentication is not required', function(){
                this.router.showView(new Backbone.View(), {requiresAuth: false});
                expect(Backbone.View.prototype.render.calledOnce).to.be.true;
            })
        })
    });
});
