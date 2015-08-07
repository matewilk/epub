define(function(require){
    'use strict';

    var MainMenu = require('views/menu'),
        JST = require('templates'),
        $ = require('jquery'),
        Backbone = require('backbone');

    describe("MainMenu View", function(){
        beforeEach(function(){
            sinon.spy(MainMenu.prototype, 'render');
            sinon.spy(MainMenu.prototype, 'itemClick');
            sinon.spy($.fn, 'html');
            sinon.spy(Backbone, 'trigger');
            this.template = JST['app/scripts/templates/menu.hbs'];
            this.mainMenu = new MainMenu();

            this.mainMenu.render();
        });

        afterEach(function(){
            MainMenu.prototype.render.restore();
            MainMenu.prototype.itemClick.restore();
            $.fn.html.restore();
            Backbone.trigger.restore();
        });

        it("should have a proper template", function(){
            expect(this.mainMenu.template()).to.equal(this.template())
        });

        it("should render the template on render", function(){
            expect(this.mainMenu.$el.html.calledWith(this.mainMenu.template())).to.be.true;
        });

        it("should call backbone trigger with proper attributes on link click", function(){
            this.mainMenu.$el.find('.dropdown-menu a[data-value="library"]').click();

            expect(this.mainMenu.itemClick.called).to.be.true;
            expect(Backbone.trigger.calledWith('router:go', 'library')).to.be.true;
        });
    });
});
