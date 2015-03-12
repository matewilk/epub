define(function(require){

    var FormView = require('views/form');

    describe('Form View', function(){
        beforeEach(function(){
            fixtures.load('form.html');
            this.fixture = fixtures.body();
            this.formId = $(this.fixture).find('form').attr('id');

            sinon.spy(Backbone.Model.prototype, '_validate');
            this.model = new Backbone.Model();
            sinon.stub(this.model, 'save');

            sinon.spy(FormView.prototype, 'showErrors');
            this.formView = new FormView({
                el: $(this.fixture),
                model: this.model
            });
        });

        afterEach(function(){
            fixtures.cleanUp();
            FormView.prototype.showErrors.restore();
            Backbone.Model.prototype._validate.restore();
        });

        it('should be able to get input field value by name', function(){
            expect(this.formView.getFieldValue('email')).to.equal('test@email.com')
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
            this.formView.model.trigger('invalid');
            expect(this.formView.showErrors.called).to.be.true;
            expect(this.formView.model._validate.called).to.be.true;
        });

        it('should be able to show validation errors', function(){

        });

        it('should be able to reset validation errors', function(){

        });

        it('should destroy the model on model success?', function(){
            //responsibility of the model itself ?
        })
    });
});
