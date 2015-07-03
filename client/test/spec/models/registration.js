define(function(require){
    'use strict';

    var RegistrationModel = require('models/registration');

    describe("Registration Model", function() {
        beforeEach(function(){
            this.defaults = {
                name: {value: '', required: true},
                email: {value: '', required: true},
                password: {value: '', required: true}
            };
            this.model = new RegistrationModel();
        });

        it("should have proper default values", function() {
            expect(this.model.defaults).to.deep.equal(this.defaults);
        });

        it('should have proper default values length', function(){
            expect(this.model.defaults).to.have.keys(["name", "email", "password"]);
        });

        it('should have a proper url', function(){
            expect(this.model.url).to.equal('/api/registration');
        });

        it("should validate form values", function(done){
            this.server = sinon.fakeServer.create();
            this.server.autoRespond = true;
            this.server.respondWith("POST", "/api/registration", [
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
                name: {value: 'Mateusz', required: true},
                email: {value: 'matewilk@gmail.com', required: true},
                password: {value: 'password', required: true}
            });
        });

        it('should trigger invalid event on invalid form submission', function(done){
            this.model.on('invalid', function(model, error){
                expect(model).to.be.instanceof(RegistrationModel);
                expect(error).to.not.be.undefined;

                done();
            });
            this.model.save();
        });

        it('validate function should return error on invalid', function(done){
            this.model.once('invalid', function(model, error){
                expect(error).to.have.length(4);

                done();
            });
            this.model.save();
        });
    });
});