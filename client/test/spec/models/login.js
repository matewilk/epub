define(function(require){
    'use strict';

    var LoginModel = require('models/login');

    describe("Login Model", function(){
        beforeEach(function(){
            this.defaults = {
                email: {value: '', required: true},
                password: {value: '', required: true}
            };
            this.model = new LoginModel();
        });

        it("should have a proper url", function(){
            expect(this.model.url).to.equal('api/login');
        });

        it("should have a proper default values", function(){
            expect(this.model.defaults).to.deep.equal(this.defaults);
        });

        it("should validate form values", function(done){
            this.server = sinon.fakeServer.create();
            this.server.autoRespond = true;
            this.server.respondWith("POST", "api/login", [
                200,
                { "Content-Type": "application/json" },
                '[]'
            ]);

            sinon.spy(this.model, 'validate');

            this.model.on('sync', function(model, response, options){
                expect(model.validate.called).to.be.true;

                done();
            });
            this.model.save({
                email: {value: 'matewilk@gmail.com', required: true},
                password: {value: 'password', required: true}
            });
        });

        it("validate function should return errors on invalid", function(done){
            this.model.once('invalid', function(model, error){
                expect(error).to.have.length(3);

                done();
            });
            this.model.save();
        });

        it("should trigger invalid event on invalid form submission", function(done){
            this.model.on('invalid', function(model, error){
                expect(model).to.be.instanceof(LoginModel);
                expect(error).to.not.be.undefined;

                done();
            });
            this.model.save();
        });

        it("validate function should return 'undefined' on validation success", function(done){
            this.server = sinon.fakeServer.create();
            this.server.autoRespond = true;
            this.server.respondWith("POST", "api/login", [
                200,
                { "Content-Type": "application/json" },
                '[]'
            ]);

            sinon.spy(this.model, 'validate');

            this.model.on('sync', function(model, response, options){
                expect(model.validate.called).to.be.true;
                expect(model.validate()).to.be.undefined;

                done();
            });

            this.model.save({
                email: {value: 'matewilk@gmail.com', required: true},
                password: {value: 'password', required: true}
            });
        });
    });
});