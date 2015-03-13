define(function(require){

    var RegistrationView = require('views/registration'),
        RegistrationModel = require('models/registration'),
        FormView = require('views/form'),
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
            var spy = sinon.spy(this.registrationView, 'template');
            this.registrationView.render();
            expect(spy.called).to.be.true;
        });

        it('should have a correct model property', function(){
            var registrationModelInstance = new this.registrationView.model();
            expect(registrationModelInstance).is.an.instanceof(RegistrationModel);
        });

        it('should extend Form view', function(){
            expect(this.registrationView).to.be.instanceof(FormView);
        });

        it('should update a model on submit', function(){

        });

        it('should send the form on submit', function(){

        });

        it('should notify user about registration success', function(){

        });

        it('should redirect user after registration success', function(){

        });

    });

});
