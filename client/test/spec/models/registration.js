define(function(require){
    'use strict';

    var RegistrationModel = require('models/registration');

    describe("Registration Model", function() {
        beforeEach(function(){
            this.defaults = {
                name: '',
                email: '',
                password: ''
            };
            this.model = new RegistrationModel();
        });

        it("should have proper default values", function() {
            expect(this.model.defaults).to.deep.equal(this.defaults);
        });

        it('should have a proper url', function(){
            expect(this.model.url).to.equal('api/registration');
        });

        it("should validate form values", function(){

        });

        it('validate function should return error on invalid', function(){

        });

        it('should trigger invalid event on invalid form submission', function(){

        });

        it('should call onInvalid function if form is invalid', function(){

        });
    });
});