define(function(require) {
    'use strict';

    var ApiUrls = require('scripts/urls');

    describe("Api Urls module", function() {

        beforeEach(function() {
            this.getUrl = ApiUrls.getUrl;
        });

        it("should return getUrl function", function() {
            expect(this.getUrl).to.be.a('function');
        });

        it("main apiUrl function should return undefined if no api address", function() {
            expect(this.getUrl('abc')).to.equal(undefined);
        });

        it("main apiUrl function should return correct api address", function() {
            expect(this.getUrl('library')).to.equals('library');
        });

        it("main apiUrl function should return api address with additional params", function() {
            expect(this.getUrl('book', 3)).to.equal('book/3');
        });
    });
});
