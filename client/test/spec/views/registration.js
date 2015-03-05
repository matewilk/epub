define(function(require){

    var RegistrationView = require('views/registration'),
        JST = require('templates');

    describe('Registration View', function(){

        beforeEach(function(){
            this.registrationView = new RegistrationView();
            this.template = JST['app/scripts/templates/registration.hbs']
        });

        it('should have a proper template', function(){
            expect(this.registrationView.template()).to.equal(this.template());
        });

        it('should render the template', function(){
            var spy = sinon.spy(this.registrationView.template);
            this.registrationView.render();
            expect(spy).to.have.been.called();
        });

        it('should have a default model with properties', function(){

        });

        it('should update a model on submit', function(){

        });

    });

});
