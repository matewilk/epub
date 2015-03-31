define(function(require){

    var DialogModel = require('models/dialog');

    describe('Dialog Model', function(){
        beforeEach(function(){
            this.defaults = {
                title: '',
                message: ''
            };
            this.model = new DialogModel();
        });

        it('should have proper default values', function(){
            expect(this.model.defaults).to.deep.equal(this.defaults);
            expect(this.model.defaults).to.have.keys(["title", "message"]);
        });
    });
});
