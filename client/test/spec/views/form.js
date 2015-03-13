define(function(require){

    var FormView = require('views/form');

    describe('Form View', function(){
        beforeEach(function(){
            fixtures.load('form.html');
            this.fixture = fixtures.body();
            this.fixtureElement = $(this.fixture);
            this.formId = this.fixtureElement.find('form').attr('id');

            sinon.spy(Backbone.Model.prototype, '_validate');
            this.model = new Backbone.Model();
            sinon.stub(this.model, 'save');

            sinon.spy(FormView.prototype, 'onInvalid');
            this.formView = new FormView({
                el: this.fixtureElement,
                model: this.model
            });
        });

        afterEach(function(){
            fixtures.cleanUp();
            FormView.prototype.onInvalid.restore();
            Backbone.Model.prototype._validate.restore();
        });

        it('should be able to get input field by name', function(){
            expect(this.formView.getField('email').val()).to.equal('test@email.com')
        });

        it('should be able to update the model', function(){
            this.formView.submitForm(this.formId);
            expect(this.formView.model.attributes).to.eql({name: 'Test Name', email: 'test@email.com'})
        });

        it('should be able to save the model', function(){
            this.formView.submitForm(this.formId);
            expect(this.formView.model.save.called).to.be.true;
        });

        it('should be able to detect if field is valid/invalid', function(){
            this.formView.model.trigger('invalid', this.model, [{field: 'name', message: 'Can not be empty'}]);
            expect(this.formView.onInvalid.called).to.be.true;
            expect(this.formView.model._validate.called).to.be.true;
        });

        it('should be able to show validation errors', function(){
            var input = this.fixtureElement.find('[name="name"]');
            this.formView.showError(input.attr('name'), 'Name already taken');
            expect(input.attr('class')).to.have.string('invalid');
            expect(this.fixtureElement.find('p')).to.have.html('Name already taken');
        });

        it('should be able to reset validation errors', function(){
            var input = this.fixtureElement.find('[name="name"]');

            this.formView.showError(input.attr('name'), 'Nasty error');
            expect(input).to.have.class('invalid');
            expect(input.next()).to.have.class('errorMessage');

            this.formView.clearError(input);
            expect(input).to.not.have.class('invalid');
            expect(input.next()).to.not.have.class('errorMessage');
        });

        xit('should destroy the model on model success?', function(){
            //responsibility of the model itself ?
        })
    });
});
