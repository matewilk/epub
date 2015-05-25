define(function(require){
    'use strict';

    var Logout = require('views/logout'),
        LogoutModel = require('models/session'),
        JST = require('templates'),
        $ = require('jquery');

    describe("Logout Form", function(){
        beforeEach(function(){
            sinon.spy(Logout.prototype, 'render');
            sinon.spy(Logout.prototype, 'logout');
            sinon.spy($.fn, 'html');
            this.template = JST['app/scripts/templates/logout.hbs'];
            this.logout = new Logout();
        });

        afterEach(function(){
            Logout.prototype.render.restore();
            Logout.prototype.logout.restore()
            $.fn.html.restore();
        });

        it("should have a LogoutModel instance in a model property", function(){
            expect(this.logout.model).to.be.instanceof(LogoutModel);
        });

        it("should have a proper template", function(){
            expect(this.logout.template()).to.equal(this.template())
        });

        it("should call render on initialize", function(){
            expect(this.logout.render.called).to.be.true;
        });

        it("should render a template on initialize", function(){
            expect(this.logout.$el.html.calledWith(this.logout.template())).to.be.true;
        });

        it("should call logout function on form submission", function(){
            sinon.stub(this.logout.model, 'save');
            this.logout.$el.find('form').submit();

            expect(this.logout.logout.called).to.be.true;
            expect(this.logout.model.save.called).to.be.true;
        });
    });
});