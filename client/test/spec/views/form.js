define(function(require){

    var FormView = require('views/form');

    describe('Form View', function(){
        beforeEach(function(){
            fixtures.load('form.html');
            this.fixture = fixtures.body();

            this.formView = new FormView({el: $(this.fixture)});
        });

        it('should be able to get input field value by name', function(){
            expect(this.formView.getFieldValue('email')).to.equal('test@email.com')
        });

        it('should be able to save the model', function(){
            //update the model for each filed and save
        });

        it('should be able to detect if field is valid/invalid', function(){

        });

        it('should be able to show validation errors', function(){

        });

        it('should be able to reset validation errors', function(){

        });
    });
});
