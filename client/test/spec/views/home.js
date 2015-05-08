define(function(require) {
    'use strict';

    var Home = require('views/home'),
        JST = require('templates');

    describe("Home View", function() {
        beforeEach(function(){
            sinon.spy($.fn, 'html');

            this.template = JST['app/scripts/templates/main.hbs'];
            this.homeView = new Home();
        });

        afterEach(function(){
            $.fn.html.restore();
        });

        it("should have a proper template",function(){
            expect(this.homeView.template()).to.equal(this.template());
        });

        it("should attach template to $el html on render", function(){
            this.homeView.render();
            expect(this.homeView.$el.html.calledWith(this.homeView.template())).to.be.true;
        });
    });
});