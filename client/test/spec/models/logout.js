define(function(require){
    'use strict';

    var LogoutModel = require('models/logout');

    describe("Logout Model", function(){
        beforeEach(function(){
            this.model = new LogoutModel();
        });

        it("should have a proper url", function(){
            expect(this.model.url).to.equal('api/logout');
        });
    })
});