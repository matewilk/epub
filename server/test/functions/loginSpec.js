var sinon = require('sinon'),
    login = require('../../router/routes/functions/login'),
    should = require('should');

describe('Login Spec', function(){
    describe('Login in', function(){
        beforeEach(function(){
            this.res = {};
            this.req = {
                body: {
                    password: {
                        value: 'pass'
                    },
                    email: {
                        value: 'example@example.com'
                    }
                },
                session: {}
            };
            this.spy = this.res.send = sinon.spy();
        });

        it("should return true if user successfully log in with password", function(){
            login.post(this.req, this.res);
            this.spy.calledWith(true).should.be.equal(true, 'login function returned false');
        });

        it("should return false if user is using wrong password", function(){
            this.req.body.password.value = 'abcd';
            login.post(this.req, this.res);
            this.spy.calledWith(false).should.be.equal(true, 'login function returned true although wrong password has been submitted');
        });
    });
});
