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
                "connect.sid": null,
                user_id: null
            };
            sinon.spy(SessionModel.prototype, 'load');
            sinon.spy(SessionModel.prototype, 'set');
            sinon.spy(SessionModel.prototype, 'listenTo');

            sinon.spy($, 'cookie');

            this.model = new SessionModel();
        });
        afterEach(function(){
            Backbone.trigger.restore();
            SessionModel.prototype.load.restore();
            SessionModel.prototype.set.restore();
            SessionModel.prototype.listenTo.restore();
            $.cookie.restore();
        });
        it('should have a proper default values', function(){
            expect(this.model.defaults).to.deep.equal(this.defaults);
        });

        describe("On initialize", function(){
            it("should load session information from cookie", function(){
                expect(this.model.load.called).to.be.true;
            });

            it("should listen to sync event", function(){
                expect(this.model.listenTo.calledWith(this.model, 'sync', this.model.update)).to.be.true;
            });
        });

        describe("update()", function(){
            it("should trigger session:change event with response from the server on model fetch", function(done){
                this.server.respondWith("GET", "api/session/authenticated", [
                    200,
                    { "Content-Type": "application/json" },
                    JSON.stringify({authenticated: true})
                ]);

                this.model.once('sync', function(){
                    expect(Backbone.trigger.calledWith('session:change', true)).to.be.ok;

                    done();
                });

                this.model.fetch();
            });
        });

        describe("authenticate()", function(){
            it("should return 'true' if user was authenticated", function(){
                this.model.auth = true;
                expect(this.model.authenticated()).to.equal(true);
            });
            it("should return 'false' if user is was not authenticated", function(){
                expect(this.model.authenticated()).to.equal(false);
            });
        });

        describe("load()", function(){
            it("should load (set) session information from cookie to model props", function(){
                expect(this.model.set.calledWith({
                    user_id: sinon.match.any,
                    "connect.sid": sinon.match.any
                })).to.be.true;
                expect($.cookie.calledTwice).to.be.true;
                expect($.cookie.calledWith('user_id')).to.be.true;
                expect($.cookie.calledWith('connect.sid')).to.be.true;
            })
        });
    });
});