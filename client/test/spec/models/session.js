define(function(require){

    var SessionModel = require('models/session'),
        Backbone = require('backbone'),
        $ = require('jquery');

    require('jquery-cookie');

    describe('Session Model', function(){
        beforeEach(function(){
            sinon.spy(Backbone, 'trigger');

            this.server = sinon.fakeServer.create();
            this.server.autoRespond = true;

            this.defaults = {
                id: 1,
                authenticated: false,
                "connect.sid": null,
                user_id: null
            };
            sinon.spy(SessionModel.prototype, 'set');
            sinon.spy(SessionModel.prototype, 'listenTo');
            sinon.spy(SessionModel.prototype, 'update');

            sinon.spy($, 'cookie');

            this.model = new SessionModel();
        });
        afterEach(function(){
            Backbone.trigger.restore();
            SessionModel.prototype.set.restore();
            SessionModel.prototype.listenTo.restore();
            SessionModel.prototype.update.restore();
            $.cookie.restore();
        });
        it('should have proper default values', function(){
            expect(this.model.defaults).to.deep.equal(this.defaults);
        });

        describe("On initialize", function(){
            it("should listen to sync event", function(){
                expect(this.model.listenTo.calledWith(this.model, 'sync', this.model.update)).to.be.true;
            });
        });

        describe("update()", function(){
            it("should set 'authenticated' value from the server on model fetch", function(done){
                this.server.respondWith("GET", "/api/session", [
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({authenticated: true})
                ]);

                this.model.once('sync', function(){
                    expect(this.model.update.calledWith(this.model, {authenticated: true})).to.be.ok;

                    done();
                }, this);

                this.model.fetch();
            });
        });

        describe("authenticated()", function(){
            it("should return 'true' if user was authenticated", function(){
                this.model.set('authenticated', true);
                expect(this.model.authenticated()).to.equal(true);
            });
            it("should return 'false' if user is was not authenticated", function(){
                expect(this.model.authenticated()).to.equal(false);
            });
        });

        describe("check()", function(){
            it("should call callback success on success and authenticated", function(done){
                this.callback = {
                    success:  function(){},
                    error: function(){}
                };
                sinon.spy(this.callback, 'success');
                sinon.spy(this.callback, 'error');

                this.server.respondWith("GET", "/api/session", [
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({authenticated: true})
                ]);

                this.model.once('sync', function(){
                    expect(this.callback.success.calledWith(this.model, {authenticated: true})).to.be.ok;

                    done();
                }, this);

                this.model.check(this.callback);
            });

            it("should call callback error on success and not authenticated", function(done){
                this.callback = {
                    success:  function(){},
                    error: function(){}
                };
                sinon.spy(this.callback, 'success');
                sinon.spy(this.callback, 'error');

                this.server.respondWith("GET", "/api/session", [
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({authenticated: false})
                ]);

                this.model.once('sync', function(){
                    expect(this.callback.error.calledWith(this.model, {authenticated: false})).to.be.ok;

                    done();
                }, this);

                this.model.check(this.callback);
            });

            it("should call callback error on server error", function(done){
                var clock = sinon.useFakeTimers();
                this.callback = {
                    success:  sinon.spy(),
                    error: sinon.spy()
                };

                this.server.respondWith("GET", "/api/session", [
                    404,
                    { "Content-Type": "application/json" },
                    '[{"test":"error"}]'
                ]);

                this.model.once('error', function(){
                    expect(this.callback.error.callCount).to.equal(1);
                    expect(this.callback.error.called).to.be.ok;

                    done();
                }, this);

                this.model.check(this.callback);

                //why clock has to be set here at min 10ms?
                clock.tick(10);
            });
        });
    });
});