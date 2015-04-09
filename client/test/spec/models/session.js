define(function(require){

    var SessionModel = require('models/session'),
        $ = require('jquery');

    require('jquery-cookie');

    describe('Session Model', function(){
        beforeEach(function(){
            this.defaults = {
                access_token: null,
                user_id: null
            };
            sinon.spy(SessionModel.prototype, 'load');
            sinon.spy(SessionModel.prototype, 'set');

            sinon.spy($, 'cookie');

            this.model = new SessionModel();
        });
        afterEach(function(){
            SessionModel.prototype.load.restore();
            SessionModel.prototype.set.restore();
            $.cookie.restore();
        });
        it('should have a proper default values', function(){
            expect(this.model.defaults).to.deep.equal(this.defaults);
        });

        describe("On initialize", function(){
            it("should load session information from cookie", function(){
                expect(this.model.load.called).to.be.true;
            });
        });

        describe("authenticate()", function(){
            it("should return 'true' if user has token", function(){
                this.model.set('access_token', 'access_token_to_handle_session');
                expect(this.model.authenticated()).to.equal(true);
            });
            it("should return 'false' if user is not authenticated", function(){
                expect(this.model.authenticated()).to.equal(false);
            });
        });

        describe("save()", function(){
            it("should save session information to cookie", function(){

            });
        });

        describe("load()", function(){
            it("should load (set) session information from cookie to model props", function(){
                expect(this.model.set.called).to.be.true;
                expect($.cookie.calledTwice).to.be.true;
                expect($.cookie.calledWith('user_id')).to.be.true;
                expect($.cookie.calledWith('access_token')).to.be.true;
            })
        });
    });
});