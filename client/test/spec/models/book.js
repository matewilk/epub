define(function(require){
    'use strict';

    var BookModel = require('../../../app/scripts/models/book');

    describe("Book Model", function() {
        beforeEach(function(){
            this.defaults = {
                title: 'Book Title',
                author: 'Unknown Author',
                isbn: 'isbn'
            };
            this.model = new BookModel();
        });

        it("should have proper defaults values", function() {
            expect(this.model.defaults).to.deep.equal(this.defaults);
        });
    });
});

