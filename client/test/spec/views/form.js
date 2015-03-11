define(function(require){

    var FormView = require('views/form');

    describe('Form View', function(){
        beforeEach(function(){
            fixtures.load('form.html');
            this.fixture = fixtures.body();
            this.formId = $(this.fixture).find('form').attr('id');

            this.model = new Backbone.Model();
            sinon.stub(this.model, 'save');

            this.formView = new FormView({
                el: $(this.fixture),
                model: this.model
            });
        });

        afterEach(function(){
            fixtures.cleanUp();
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
