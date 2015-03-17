define(function(require){

    var RegistrationView = require('views/registration'),
        RegistrationModel = require('models/registration'),
        FormView = require('views/form'),
        JST = require('templates');

    describe('Registration View', function(){

        beforeEach(function(){
            sinon.stub(FormView.prototype, 'submitForm');
            sinon.spy(RegistrationView.prototype, 'register');
            sinon.spy(RegistrationView.prototype, 'registrationSuccess');
            this.registrationView = new RegistrationView();
            this.template = JST['app/scripts/templates/registration.hbs']
        });

        afterEach(function(){
            FormView.prototype.submitForm.restore();
            RegistrationView.prototype.register.restore();
            RegistrationView.prototype.registrationSuccess.restore();
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
            expect(this.registrationView.model).is.an.instanceof(RegistrationModel);
        });

        it('should extend Form view', function(){
            expect(this.registrationView).to.be.instanceof(FormView);
        });

        describe('on form submit', function() {
            beforeEach(function(){
                this.registrationView.render();
                this.registrationView.$el.find('form').submit();
            });
            it('should call register method', function(){
                expect(this.registrationView.register.called).to.be.true;
            });

            it('should call submitForm with form id', function(){
                expect(this.registrationView.submitForm.calledWith('registration')).to.be.true;
            });
        });


        describe('on registration success', function(){
            beforeEach(function(){
                this.server = sinon.fakeServer.create();
                this.server.autoRespond = true;
                this.server.respondWith("POST", "api/registration", [
                    200,
                    { "Content-Type": "application/json" },
                    '[]'
                ]);
            });
            it('should notify user about registration success', function(done){
                FormView.prototype.submitForm.restore();

                var registrationView = this.registrationView;
                registrationView.render();
                registrationView.$el.find('[name="email"]').val('matewilk@gmail.com');

                this.registrationView.model.once("sync", function() {
                    expect(registrationView.registrationSuccess.called).to.be.true;

                    done();
                });

                registrationView.$el.find('form').submit();
                sinon.stub(FormView.prototype, 'submitForm');
            });

            it('should redirect user after registration success', function(){

            });
        })
    });

});